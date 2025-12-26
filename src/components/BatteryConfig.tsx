import { memo } from 'react';
import { Battery, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { batteryConfigs } from '@/data/appliances';

interface BatteryConfigProps {
  config: {
    voltage: number;
    capacity: number;
    count: number;
    dod: number;
  };
  onConfigChange: (config: {
    voltage: number;
    capacity: number;
    count: number;
    dod: number;
  }) => void;
}

export const BatteryConfig = memo(function BatteryConfig({
  config,
  onConfigChange,
}: BatteryConfigProps) {
  const totalEnergy = (config.voltage * config.capacity * config.count * config.dod) / 1000;

  return (
    <Card variant="glass" className="animate-slide-up" style={{ animationDelay: '150ms' }}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Battery className="h-5 w-5 text-primary" />
          Battery Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Bank Voltage</Label>
            <Select
              value={config.voltage.toString()}
              onValueChange={(v) => onConfigChange({ ...config, voltage: parseInt(v) })}
            >
              <SelectTrigger className="bg-secondary/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {batteryConfigs.voltages.map((v) => (
                  <SelectItem key={v} value={v.toString()}>
                    {v}V
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Capacity (Ah)</Label>
            <Select
              value={config.capacity.toString()}
              onValueChange={(v) => onConfigChange({ ...config, capacity: parseInt(v) })}
            >
              <SelectTrigger className="bg-secondary/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {batteryConfigs.capacities.map((c) => (
                  <SelectItem key={c} value={c.toString()}>
                    {c}Ah
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Number of Batteries</Label>
            <span className="font-display font-semibold text-primary">{config.count}</span>
          </div>
          <Slider
            value={[config.count]}
            onValueChange={([v]) => onConfigChange({ ...config, count: v })}
            min={1}
            max={8}
            step={1}
            className="py-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Depth of Discharge</Label>
            <span className="font-display font-semibold text-primary">{Math.round(config.dod * 100)}%</span>
          </div>
          <Slider
            value={[config.dod * 100]}
            onValueChange={([v]) => onConfigChange({ ...config, dod: v / 100 })}
            min={50}
            max={100}
            step={5}
            className="py-2"
          />
        </div>

        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Gauge className="h-4 w-4" />
              <span className="text-sm">Usable Energy</span>
            </div>
            <span className="font-display text-lg font-bold text-primary">
              {totalEnergy.toFixed(1)} kWh
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
