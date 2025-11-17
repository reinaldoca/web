type FeatureItemProps = {
  icon: string;
  text: string;
};

export function FeatureItem({ icon, text }: FeatureItemProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-xl mt-[-2px]" role="img">{icon}</span>
      <span className="flex-1 text-sm text-muted-foreground">{text}</span>
    </li>
  );
}
