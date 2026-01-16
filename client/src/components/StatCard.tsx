import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: "primary" | "accent" | "default";
}

export function StatCard({ 
  label, 
  value, 
  subtext, 
  icon: Icon,
  color = "default" 
}: StatCardProps) {
  
  const colorMap = {
    primary: "text-primary bg-primary/10 border-primary/20",
    accent: "text-accent bg-accent/10 border-accent/20",
    default: "text-muted-foreground bg-white/5 border-white/10"
  };

  const iconStyle = colorMap[color];

  return (
    <Card className="glass-card overflow-hidden hover:border-white/10 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
            <h3 className="text-3xl font-display font-bold tracking-tight text-white mb-1">
              {value}
            </h3>
            {subtext && (
              <p className="text-xs text-muted-foreground/80 font-mono">{subtext}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl border ${iconStyle}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
