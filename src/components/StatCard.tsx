
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            {trend.direction === 'up' && (
              <span className="text-green-500">↑</span>
            )}
            {trend.direction === 'down' && (
              <span className="text-red-500">↓</span>
            )}
            <span className={cn(
              "ml-1",
              trend.direction === 'up' && "text-green-500",
              trend.direction === 'down' && "text-red-500"
            )}>
              {trend.value}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
