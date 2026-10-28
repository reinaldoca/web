import { NextResponse } from "next/server";

/**
 * Recibe el formulario de contacto y lo envía por email con la API de Resend.
 * Variables requeridas (ver .env.example): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 * Sin configurar, responde 503 para que el formulario muestre el error en lugar de fingir el envío.
 */

const LIMITS = { name: 120, email: 200, company: 160, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Límite simple por IP (best-effort: se reinicia con cada instancia del servidor)
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

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

function field(body: Record<string, unknown>, key: keyof typeof LIMITS) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    return value.slice(0, LIMITS[key]);
}

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
        return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    // Honeypot: los bots completan el campo oculto "website"; se responde OK sin enviar nada
    if (typeof body.website === "string" && body.website.trim() !== "") {
        return NextResponse.json({ ok: true });
    }

    const name = field(body, "name");
    const email = field(body, "email");
    const company = field(body, "company");
    const message = field(body, "message");

    if (!name || !EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "invalid_fields" }, { status: 422 });
    }

    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
        console.error("[contact] Faltan RESEND_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL; el mensaje no se envió.");
        return NextResponse.json({ error: "not_configured" }, { status: 503 });
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
        console.error("[contact] Resend respondió", response.status, await response.text().catch(() => ""));
        return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
}
