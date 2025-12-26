import { memo, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  highlight?: boolean;
  delay?: number;
}

export const StatCard = memo(function StatCard({
  label,
  value,
  unit,
  icon,
  highlight = false,
  delay = 0,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;

  useEffect(() => {
    const duration = 500;
    const steps = 20;
    const stepDuration = duration / steps;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(numericValue, increment * step);
      setDisplayValue(current);
      
      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(numericValue);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <Card
      variant="stat"
      className={cn(
        'p-4 animate-slide-up',
        highlight && 'border-primary/50 glow-effect'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <div className={cn(
          'p-1.5 rounded-md',
          highlight ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
        )}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={cn(
          'font-display text-2xl font-bold tabular-nums',
          highlight ? 'text-primary' : 'text-foreground'
        )}>
          {typeof value === 'number' 
            ? displayValue.toLocaleString(undefined, { maximumFractionDigits: 1 })
            : value
          }
        </span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </Card>
  );
});
