import { memo } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { ApplianceWithQuantity } from '@/data/appliances';
import { cn } from '@/lib/utils';

interface ApplianceCardProps {
  appliance: ApplianceWithQuantity;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const ApplianceCard = memo(function ApplianceCard({
  appliance,
  onUpdateQuantity,
}: ApplianceCardProps) {
  const isActive = appliance.quantity > 0;

  return (
    <Card
      variant={isActive ? 'interactive' : 'default'}
      className={cn(
        'p-4 flex items-center justify-between gap-3 group',
        isActive && 'border-primary/50 bg-primary/5'
      )}
    >
      <div className="flex-1 min-w-0">
        <p className={cn(
          'font-medium text-sm truncate transition-colors',
          isActive ? 'text-foreground' : 'text-muted-foreground'
        )}>
          {appliance.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {appliance.wattage}W
          {appliance.surge > 1 && (
            <span className="text-warning ml-2">
              ×{appliance.surge} surge
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="stepper"
          size="icon"
          onClick={() => onUpdateQuantity(appliance.id, appliance.quantity - 1)}
          disabled={appliance.quantity === 0}
          aria-label="Decrease quantity"
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>

        <span className={cn(
          'w-8 text-center font-display font-semibold tabular-nums transition-all',
          isActive && 'text-primary animate-count'
        )}>
          {appliance.quantity}
        </span>

        <Button
          variant="stepper"
          size="icon"
          onClick={() => onUpdateQuantity(appliance.id, appliance.quantity + 1)}
          aria-label="Increase quantity"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
});
