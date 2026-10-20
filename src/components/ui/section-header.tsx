import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * NexusAI-style section header component
 * Badge with purple accent and modern typography
 */
export function SectionHeader({
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-12 md:mb-16", className)}>
      {/* Badge estilo NexusAI */}
      <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.3)]">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a78bfa]">
          {label}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight leading-tight">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-base md:text-lg text-[var(--tx2)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
