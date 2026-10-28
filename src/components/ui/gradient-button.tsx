import Link from "next/link";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "gradient" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

/**
 * Botón principal estilo nublit: degradado celeste → azul, forma pill.
 * La variante outline usa el borde translúcido de la paleta.
 */
export function GradientButton({
  children,
  variant = "gradient",
  href,
  onClick,
  className,
  disabled = false,
  type = "button",
}: GradientButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-nb-sky/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";

  const variantStyles = {
    gradient:
      "bg-gradient-to-r from-nb-sky to-nb-blue text-white hover:shadow-[0_10px_30px_rgba(66,162,254,0.35)] hover:-translate-y-0.5",
    outline:
      "border border-nb-line text-white hover:border-nb-sky/50 hover:bg-nb-sky/10",
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
      type={type}
    >
      {children}
    </button>
  );
}
