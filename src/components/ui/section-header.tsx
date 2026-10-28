import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Encabezado de sección estilo nublit:
 * etiqueta pequeña en celeste, título blanco con tracking negativo y bajada gris azulada.
 */
export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full border border-nb-line bg-nb-surface">
        <span className="h-1.5 w-1.5 rounded-full bg-nb-sky" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-nb-sky">
          {label}
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight leading-[1.1]">
        {title}
      </h2>

      {description && (
        <p className="text-base md:text-lg text-nb-text leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
