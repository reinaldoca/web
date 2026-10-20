import Link from "next/link";
import { cn } from "@/lib/utils";

interface PipelineCardProps {
  status?: "success" | "running" | "pending";
  icon: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  showConnector?: boolean;
  className?: string;
}

/**
 * Pipeline-style card component
 * Replaces generic rounded cards with DevOps pipeline node aesthetic
 */
export function PipelineCard({
  status = "success",
  icon,
  title,
  description,
  tags,
  href,
  showConnector = false,
  className,
}: PipelineCardProps) {
  const statusColors = {
    success: "border-[#3FB950]",
    running: "border-[#58A6FF]",
    pending: "border-[#8B949E]",
  };

  const statusBg = {
    success: "from-[#3FB950]/20 to-[#3FB950]/10",
    running: "from-[#58A6FF]/20 to-[#58A6FF]/10",
    pending: "from-[#8B949E]/20 to-[#8B949E]/10",
  };

  const Content = (
    <div
      className={cn(
        "relative h-full min-h-[300px] p-8",
        "bg-white border-l-4",
        statusColors[status],
        "hover:shadow-2xl transition-all duration-300",
        showConnector && "pipeline-connector",
        className
      )}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <span className="font-mono text-xs text-[#8B949E] uppercase tracking-wider">
          {status}
        </span>
      </div>

      {/* Icon */}
      <div className="mb-6">
        <div
          className={cn(
            "inline-flex h-14 w-14 items-center justify-center",
            "rounded-lg bg-gradient-to-br",
            statusBg[status]
          )}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-3 text-[#24292F]">
        {title}
      </h3>

      <p className="text-[#57606A] leading-relaxed mb-4">{description}</p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-1 rounded bg-[#161B22] text-[#8B949E]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className="block h-full group">
      {Content}
    </Link>
  ) : (
    Content
  );
}
