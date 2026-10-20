import Link from "next/link";
import { Terminal, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: "terminal" | "chevron" | "none";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Terminal command-style button component
 * Replaces generic buttons with ArrowRight icons
 */
export function TerminalButton({
  children,
  variant = "primary",
  icon = "terminal",
  href,
  onClick,
  className,
  disabled = false,
}: TerminalButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const variantStyles = {
    primary:
      "bg-[#3FB950] text-[#0D1117] hover:bg-[#3FB950]/90 focus-visible:ring-4 focus-visible:ring-[#3FB950]/50 focus-visible:outline-none",
    secondary:
      "border-2 border-[#3FB950] text-[#3FB950] hover:bg-[#3FB950]/10 focus-visible:ring-4 focus-visible:ring-[#3FB950]/50 focus-visible:outline-none",
  };

  const IconComponent =
    icon === "terminal" ? Terminal : icon === "chevron" ? ChevronRight : null;

  const Content = (
    <>
      {children}
      {IconComponent && <IconComponent className="h-4 w-4" aria-hidden="true" />}
    </>
  );

  const combinedClassName = cn(baseStyles, variantStyles[variant], className);

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedClassName}>
        {Content}
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
      {Content}
    </button>
  );
}
