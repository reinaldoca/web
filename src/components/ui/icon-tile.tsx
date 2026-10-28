import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

const SIZES = {
    sm: { box: "h-9 w-9 rounded-lg", icon: "h-[18px] w-[18px]" },
    md: { box: "h-12 w-12 rounded-xl", icon: "h-6 w-6" },
    lg: { box: "h-14 w-14 rounded-2xl", icon: "h-7 w-7" },
} as const;

interface IconTileProps {
    /** Íconos de lucide o cualquier SVG con la misma interfaz (p. ej. WhatsAppIcon). */
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
    size?: keyof typeof SIZES;
    className?: string;
}

/**
 * Recuadro de ícono único del sitio: misma forma, borde, degradado y trazo en menús, cards y encabezados.
 * Se ilumina cuando su contenedor tiene la clase `group` y está en hover.
 */
export function IconTile({ icon: Icon, size = "md", className }: IconTileProps) {
    const s = SIZES[size];
    return (
        <span
            aria-hidden="true"
            className={cn(
                "inline-flex shrink-0 items-center justify-center border border-nb-sky/25 bg-gradient-to-br from-nb-sky/20 to-nb-blue/10 text-nb-sky",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[border-color,background-color,color,box-shadow] duration-300",
                "group-hover:border-nb-sky/50 group-hover:from-nb-sky/30 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(66,162,254,0.25)]",
                s.box,
                className
            )}
        >
            <Icon className={s.icon} strokeWidth={1.75} />
        </span>
    );
}
