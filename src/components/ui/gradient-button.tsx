import Link from "next/link";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "gradient" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

/**
 * NexusAI-style gradient button component
 * Features purple-blue gradient for primary actions
 */
export function GradientButton({
  children,
  variant = "gradient",
  href,
  onClick,
  className,
  disabled = false,
}: GradientButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";

  const variantStyles = {
    gradient:
      "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-purple-500/50 focus-visible:outline-none",
    outline:
      "border border-[var(--bd2)] text-[var(--tx)] hover:border-[rgba(139,92,246,0.3)] hover:bg-[rgba(139,92,246,0.05)] focus-visible:ring-4 focus-visible:ring-purple-500/50 focus-visible:outline-none",
  };

  const combinedClassName = cn(baseStyles, variantStyles[variant], className);

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      type="button"
    >
      {children}
    </button>
  );
}
