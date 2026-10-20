import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  prompt?: "dollar" | "arrow" | "hash"; // $, >, #
  showCursor?: boolean;
  className?: string;
}

/**
 * Terminal-style section header component
 * Replaces generic ALL-CAPS labels with command prompt aesthetic
 */
export function SectionHeader({
  label,
  title,
  description,
  prompt = "dollar",
  showCursor = false,
  className,
}: SectionHeaderProps) {
  const promptSymbol = {
    dollar: "$",
    arrow: ">",
    hash: "#",
  }[prompt];

  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-16", className)}>
      {/* Command style label */}
      <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-[#0D1117] text-[#3FB950] font-mono text-sm">
        <span aria-hidden="true">{promptSymbol}</span>
        <span>{label}</span>
        {showCursor && (
          <span className="terminal-cursor" aria-hidden="true">
            _
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold mb-6 text-[#24292F]">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-lg md:text-xl text-[#57606A] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
