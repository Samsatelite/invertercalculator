import { memo } from 'react';
import { 
  Thermometer, 
  UtensilsCrossed, 
  Tv, 
  Lightbulb, 
  Monitor, 
  Zap,
  type LucideIcon 
} from 'lucide-react';
import { ApplianceCard } from './ApplianceCard';
import type { ApplianceWithQuantity } from '@/data/appliances';
import { applianceCategories } from '@/data/appliances';

const iconMap: Record<string, LucideIcon> = {
  Thermometer,
  UtensilsCrossed,
  Tv,
  Lightbulb,
  Monitor,
  Zap,
};

interface CategorySectionProps {
  categoryId: string;
  appliances: ApplianceWithQuantity[];
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const CategorySection = memo(function CategorySection({
  categoryId,
  appliances,
  onUpdateQuantity,
}: CategorySectionProps) {
  const category = applianceCategories.find(c => c.id === categoryId);
  if (!category) return null;

  const IconComponent = iconMap[category.icon] || Zap;
  const activeCount = appliances.filter(a => a.quantity > 0).length;

  return (
    <div className="animate-slide-up" style={{ animationDelay: `${applianceCategories.indexOf(category) * 50}ms` }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <IconComponent className="h-4 w-4" />
        </div>
        <h3 className="font-display font-semibold text-foreground">
          {category.name}
        </h3>
        {activeCount > 0 && (
          <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">
            {activeCount} selected
          </span>
        )}
      </div>
      
      <div className="grid gap-2">
        {appliances.map(appliance => (
          <ApplianceCard
            key={appliance.id}
            appliance={appliance}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </div>
  );
});
