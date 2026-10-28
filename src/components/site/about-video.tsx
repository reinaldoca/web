"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { premiumSpring } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

/**
 * Video de "Sobre CloudBit".
 * - Loop continuo mientras la sección está en pantalla, igual en celular y escritorio (pedido explícito;
 *   excepción a la regla de "sin animaciones infinitas" del CLAUDE.md). Al salir de pantalla se pausa.
 * - Si el navegador bloquea el autoplay (p. ej. iPhone en modo de bajo consumo), arranca con el primer
 *   toque en la página; el botón de play queda solo como último recurso.
 */
export function AboutVideo({ src }: { src: string }) {
    const { u } = useLanguage();
    const copy = u.about.video;
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const inViewRef = useRef(false);
    const [blocked, setBlocked] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const video = videoRef.current;
        if (!container || !video) return;

        // iOS Safari exige el atributo `muted` en el HTML para permitir autoplay; React solo setea la propiedad
        video.muted = true;
        video.defaultMuted = true;
        video.setAttribute("muted", "");

        const tryPlay = () => {
            video
                .play()
                .then(() => setBlocked(false))
                .catch(() => setBlocked(true));
        };

        // Plan B: si el autoplay fue bloqueado, el primer toque/clic en la página lo habilita
        const unlock = () => {
            if (inViewRef.current) tryPlay();
        };
        window.addEventListener("touchstart", unlock, { passive: true });
        window.addEventListener("pointerdown", unlock);

        const observer = new IntersectionObserver(
            (entries) => {
                // Con scroll rápido llegan varios avisos juntos: el último es el estado actual
                const entry = entries[entries.length - 1];
                inViewRef.current = entry.isIntersecting;
                if (entry.isIntersecting) tryPlay();
                else video.pause();
            },
            { threshold: 0.4 }
        );
        observer.observe(container);

        return () => {
            observer.disconnect();
            window.removeEventListener("touchstart", unlock);
            window.removeEventListener("pointerdown", unlock);
        };
    }, []);

    const start = () => {
        videoRef.current
            ?.play()
            .then(() => setBlocked(false))
            .catch(() => setBlocked(true));
    };

    return (
        <div
            ref={containerRef}
            className="group relative w-full overflow-hidden rounded-3xl border border-nb-line bg-[#0a1324]"
        >
            <video
                ref={videoRef}
                src={`${src}#t=0.1`}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={copy.aria}
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Viñeta para integrar el video con el fondo oscuro del sitio */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgba(8,14,27,0.85)_100%)]"
            />

            {/* Solo aparece si el navegador bloqueó la reproducción automática */}
            <motion.button
                type="button"
                onClick={start}
                aria-label={copy.play}
                initial={false}
                animate={{ opacity: blocked ? 1 : 0, y: blocked ? 0 : 8 }}
                transition={premiumSpring}
                className={cn(
                    "absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-nb-dark/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-nb-sky/50 hover:bg-nb-blue/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nb-sky",
                    !blocked && "pointer-events-none"
                )}
            >
                <Play className="h-4 w-4" aria-hidden="true" />
                {copy.play}
            </motion.button>
        </div>
    );
}
