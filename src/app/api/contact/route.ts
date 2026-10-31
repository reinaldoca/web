import { NextResponse } from "next/server";

/**
 * Recibe el formulario de contacto y lo envía por email con la API de Resend.
 * Variables (ver .env.example): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * y, opcionalmente, TURNSTILE_SECRET_KEY para exigir el desafío anti-bots de Cloudflare.
 * Sin configurar, responde 503 para que el formulario muestre el error en lugar de fingir el envío.
 *
 * Capas anti-abuso (el destinatario es fijo, así que el riesgo es spam a nuestra casilla):
 * origen del pedido, límite por IP, honeypot, tiempo mínimo de llenado, filtro de links y Turnstile.
 * A los bots detectados se les responde { ok: true } sin enviar nada, para no revelar qué los delató.
 */

const LIMITS = { name: 120, email: 200, company: 160, message: 5000 };
const SENDER_NAME = "CloudBit Web";
const RESEND_TEST_SENDER = `${SENDER_NAME} <onboarding@resend.dev>`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /(https?:\/\/|www\.)\S+/i;
const URL_RE_ALL = /(https?:\/\/|www\.)\S+/gi;

/** Un humano tarda más que esto en completar el formulario; los bots suelen enviar al instante. */
const MIN_FILL_MS = 3000;
/** Un formulario abierto más de 2 horas se trata como token vencido o reutilizado. */
const MAX_FILL_MS = 2 * 60 * 60 * 1000;
const MAX_LINKS_IN_MESSAGE = 3;

// Límite simple por IP (best-effort: se reinicia con cada instancia del servidor).
// Para un límite duradero, sumar una regla de rate limiting en Vercel Firewall sobre /api/contact.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > MAX_PER_WINDOW;
}

/** Lee una variable de entorno quitando espacios y comillas envolventes pegadas por error en el panel. */
function readEnv(key: string) {
    const raw = process.env[key];
    if (!raw) return "";
    return raw.trim().replace(/^(['"])(.*)\1$/, "$2").trim();
}

/** "web@dominio" → "CloudBit Web <web@dominio>"; si ya trae nombre ("Nombre <...>") se respeta. */
function withSenderName(from: string) {
    return from.includes("<") ? from : `${SENDER_NAME} <${from}>`;
}

/** Acepta solo pedidos hechos desde el propio sitio (mismo host o NEXT_PUBLIC_SITE_URL). */
function isAllowedOrigin(request: Request) {
    const origin = request.headers.get("origin");
    if (!origin) return false;
    try {
        const originHost = new URL(origin).host;
        const allowed = new Set([request.headers.get("host") ?? ""]);
        const siteUrl = readEnv("NEXT_PUBLIC_SITE_URL");
        if (siteUrl) {
            const siteHost = new URL(siteUrl).host;
            allowed.add(siteHost);
            allowed.add(siteHost.startsWith("www.") ? siteHost.slice(4) : `www.${siteHost}`);
        }
        return allowed.has(originHost);
    } catch {
        return false;
    }
}

/** Verifica el token de Cloudflare Turnstile. Si no hay TURNSTILE_SECRET_KEY, la verificación está desactivada. */
async function passesTurnstile(token: unknown, ip: string) {
    const secret = readEnv("TURNSTILE_SECRET_KEY");
    if (!secret) return true;
    if (typeof token !== "string" || !token) return false;
    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ secret, response: token, ...(ip !== "unknown" && { remoteip: ip }) }),
        });
        const result = (await response.json()) as { success?: boolean; "error-codes"?: string[] };
        if (!result.success) console.warn(`[contact] Turnstile rechazó el token: ${(result["error-codes"] ?? []).join(", ")}`);
        return !!result.success;
    } catch (error) {
        console.error("[contact] No se pudo verificar Turnstile:", error);
        return false;
    }
}

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

function field(body: Record<string, unknown>, key: keyof typeof LIMITS) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    return value.slice(0, LIMITS[key]);
}

/** Quita saltos de línea y caracteres de control: estos campos van en el asunto del mail. */
function singleLine(value: string) {
    return value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Respuesta para bots: parece un envío exitoso, pero no se manda nada. */
function silentDrop(reason: string, ip: string) {
    console.warn(`[contact] Envío descartado (${reason}) desde ${ip}.`);
    return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (!isAllowedOrigin(request)) {
        console.warn(`[contact] Origen no permitido: ${request.headers.get("origin") ?? "(sin origin)"} desde ${ip}.`);
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    if (isRateLimited(ip)) {
        return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    // Honeypot: los bots completan el campo oculto "website"
    if (typeof body.website === "string" && body.website.trim() !== "") {
        return silentDrop("honeypot", ip);
    }

    // Tiempo de llenado: el formulario manda el momento en que se mostró
    const startedAt = typeof body.startedAt === "number" ? body.startedAt : NaN;
    const elapsed = Date.now() - startedAt;
    if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
        return silentDrop(`tiempo de llenado ${Number.isFinite(elapsed) ? `${Math.round(elapsed / 1000)}s` : "ausente"}`, ip);
    }

    const name = singleLine(field(body, "name"));
    const email = field(body, "email");
    const company = singleLine(field(body, "company"));
    const message = field(body, "message");

    if (!name || !EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
    }

    // Contenido típico de spam: links en el nombre/empresa o demasiados links en el mensaje
    if (URL_RE.test(name) || URL_RE.test(company) || (message.match(URL_RE_ALL)?.length ?? 0) > MAX_LINKS_IN_MESSAGE) {
        return silentDrop("links sospechosos", ip);
    }

    if (!(await passesTurnstile(body.turnstileToken, ip))) {
        return NextResponse.json({ error: "verification_failed" }, { status: 403 });
    }

    const RESEND_API_KEY = readEnv("RESEND_API_KEY");
    // Respaldo: si no hay CONTACT_TO_EMAIL se usa GMAIL_EMAIL (variable ya existente en el proyecto)
    const CONTACT_TO_EMAIL = readEnv("CONTACT_TO_EMAIL") || readEnv("GMAIL_EMAIL");
    // Respaldo: remitente de prueba de Resend. Solo puede enviar al email dueño de la cuenta de Resend;
    // para enviar a cualquier destinatario, definir CONTACT_FROM_EMAIL con un dominio verificado.
    const CONTACT_FROM_EMAIL = readEnv("CONTACT_FROM_EMAIL") ? withSenderName(readEnv("CONTACT_FROM_EMAIL")) : RESEND_TEST_SENDER;
    const missing = [
        ["RESEND_API_KEY", RESEND_API_KEY],
        ["CONTACT_TO_EMAIL (o GMAIL_EMAIL)", CONTACT_TO_EMAIL],
    ]
        .filter(([, value]) => !value)
        .map(([key]) => key);
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
        // Solo nombres y entorno, nunca valores. En Vercel: revisar que estén en "Production" y redeployar.
        console.error(
            `[contact] Faltan variables: ${missing.join(", ")} (entorno: ${process.env.VERCEL_ENV ?? process.env.NODE_ENV}); el mensaje no se envió.`
        );
        return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    if (CONTACT_FROM_EMAIL === RESEND_TEST_SENDER) {
        console.warn("[contact] Sin CONTACT_FROM_EMAIL: se usa el remitente de prueba de Resend (onboarding@resend.dev).");
    }

    const rows = [
        ["Nombre", name],
        ["Email", email],
        ["Empresa", company || "—"],
        ["Mensaje", message || "—"],
    ];
    const html = `<h2>Nuevo contacto desde cloudbit.com.ar</h2><table cellpadding="6">${rows
        .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`)
        .join("")}</table>`;

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            from: CONTACT_FROM_EMAIL,
            to: CONTACT_TO_EMAIL.split(",").map((address) => address.trim()),
            reply_to: email,
            subject: `Nuevo contacto: ${name}${company ? ` (${company})` : ""}`,
            html,
            text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
        }),
    });

    if (!response.ok) {
        // Resend devuelve { name, message }: el message explica la causa (dominio sin verificar, destinatario no permitido, etc.)
        const detail = await response.text().catch(() => "");
        let reason = detail;
        try {
            const parsed = JSON.parse(detail) as { name?: string; message?: string };
            reason = [parsed.name, parsed.message].filter(Boolean).join(": ") || detail;
        } catch {
            // respuesta no JSON: se registra tal cual
        }
        console.error(`[contact] Resend rechazó el envío (${response.status}): ${reason}`);
        return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
}
