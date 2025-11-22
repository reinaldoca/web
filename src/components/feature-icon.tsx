import { cn } from "@/lib/utils";

type FeatureIconProps = {
    emoji: string;
    className?: string;
};

export function FeatureIcon({ emoji, className }: FeatureIconProps) {
    return (
        <div className={cn("text-2xl", className)} role="img" aria-label="feature icon">
            {emoji}
        </div>
    );
}
