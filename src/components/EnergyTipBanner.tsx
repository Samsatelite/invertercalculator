import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function EnergyTipBanner() {
  return (
    <Alert className="bg-primary/5 border-primary/20 mb-6">
      <AlertTitle className="text-primary font-display font-semibold">
        Important Tips
      </AlertTitle>
      <AlertDescription className="text-muted-foreground mt-2 space-y-1">
        <p>1. For best inverter performance, use energy-saving appliances whenever possible.</p>
        <p>2. Avoid running multiple heavy-duty devices at the same time, as this significantly increases the inverter capacity required.</p>
      </AlertDescription>
    </Alert>
  );
}
