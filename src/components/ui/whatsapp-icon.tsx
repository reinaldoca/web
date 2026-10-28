import type { SVGProps } from "react";
import { siWhatsapp } from "simple-icons";
import { cn } from "@/lib/utils";

interface WhatsAppIconProps extends SVGProps<SVGSVGElement> {
    /** Pinta el logo con el verde oficial en lugar de currentColor. */
    brandColor?: boolean;
}

/** Logo oficial de WhatsApp (simple-icons, CC0). Acepta las mismas props que los íconos de lucide. */
export function WhatsAppIcon({ className, brandColor = false, ...props }: WhatsAppIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            {...props}
            className={cn("h-5 w-5", className)}
            fill={brandColor ? `#${siWhatsapp.hex}` : "currentColor"}
        >
            <path d={siWhatsapp.path} />
        </svg>
    );
}
