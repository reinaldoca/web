"use client";

import { useEffect, useRef } from "react";

/** API global que expone el script de Cloudflare Turnstile. */
interface TurnstileApi {
    render: (container: HTMLElement, options: Record<string, unknown>) => string;
    reset: (widgetId?: string) => void;
    remove: (widgetId: string) => void;
}

declare global {
    interface Window {
        turnstile?: TurnstileApi;
    }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Carga el script una sola vez y resuelve cuando `window.turnstile` está disponible. */
function loadTurnstile(): Promise<TurnstileApi> {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    return new Promise((resolve, reject) => {
        let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement("script");
            script.id = SCRIPT_ID;
            script.src = SCRIPT_SRC;
            script.async = true;
            document.head.appendChild(script);
        }
        script.addEventListener("load", () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile"))));
        script.addEventListener("error", () => reject(new Error("turnstile")));
    });
}

interface TurnstileProps {
    siteKey: string;
    language: string;
    /** Recibe el token válido, o null cuando vence o falla. */
    onToken: (token: string | null) => void;
    /** Cambiar este valor fuerza un desafío nuevo (p. ej. después de un envío). */
    resetKey?: number;
}

/**
 * Widget de Cloudflare Turnstile con renderizado explícito, para que funcione también
 * al llegar al formulario navegando dentro del sitio (sin recargar la página).
 */
export function Turnstile({ siteKey, language, onToken, resetKey = 0 }: TurnstileProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const onTokenRef = useRef(onToken);

    useEffect(() => {
        onTokenRef.current = onToken;
    }, [onToken]);

    useEffect(() => {
        let widgetId: string | undefined;
        let cancelled = false;

        loadTurnstile()
            .then((turnstile) => {
                if (cancelled || !containerRef.current) return;
                widgetId = turnstile.render(containerRef.current, {
                    sitekey: siteKey,
                    theme: "dark",
                    language,
                    callback: (token: string) => onTokenRef.current(token),
                    "expired-callback": () => onTokenRef.current(null),
                    "error-callback": () => onTokenRef.current(null),
                });
            })
            .catch(() => onTokenRef.current(null));

        return () => {
            cancelled = true;
            if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
        };
    }, [siteKey, language, resetKey]);

    return <div ref={containerRef} className="min-h-[65px]" />;
}
