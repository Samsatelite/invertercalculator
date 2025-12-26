import { memo } from 'react';
import { Zap, Activity, Clock, AlertTriangle, Lightbulb, Download, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from './StatCard';
import { cn } from '@/lib/utils';

interface ResultsPanelProps {
  calculations: {
    totalLoad: number;
    peakSurge: number;
    requiredKva: number;
    recommendedInverter: number;
    backupHours: number;
    warnings: string[];
    recommendations: string[];
  };
  activeCount: number;
  onReset: () => void;
  onDownloadPDF: () => void;
}

export const ResultsPanel = memo(function ResultsPanel({
  calculations,
  activeCount,
  onReset,
  onDownloadPDF,
}: ResultsPanelProps) {
  const hasResults = activeCount > 0;

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Total Load"
          value={calculations.totalLoad}
          unit="W"
          icon={<Zap className="h-4 w-4" />}
          delay={0}
        />
        <StatCard
          label="Peak Surge"
          value={calculations.peakSurge}
          unit="W"
          icon={<Activity className="h-4 w-4" />}
          delay={50}
        />
        <StatCard
          label="Inverter Size"
          value={calculations.recommendedInverter}
          unit="kVA"
          icon={<Zap className="h-4 w-4" />}
          highlight
          delay={100}
        />
        <StatCard
          label="Backup Time"
          value={calculations.backupHours}
          unit="hours"
          icon={<Clock className="h-4 w-4" />}
          highlight
          delay={150}
        />
      </div>

      {/* Warnings */}
      {calculations.warnings.length > 0 && (
        <Card variant="warning" className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-warning">
              <AlertTriangle className="h-4 w-4" />
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {calculations.warnings.map((warning, i) => (
                <li key={i} className="text-sm text-warning/90 flex items-start gap-2">
                  <span className="text-warning mt-1.5">•</span>
                  {warning}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {calculations.recommendations.length > 0 && (
        <Card variant="success" className="animate-slide-up" style={{ animationDelay: '250ms' }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base text-success">
              <Lightbulb className="h-4 w-4" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {calculations.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-success/90 flex items-start gap-2">
                  <span className="text-success mt-1.5">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className={cn(
        'flex gap-3 pt-2',
        !hasResults && 'opacity-50 pointer-events-none'
      )}>
        <Button
          variant="outline"
          className="flex-1"
          onClick={onReset}
          disabled={!hasResults}
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        <Button
          variant="glow"
          className="flex-1"
          onClick={onDownloadPDF}
          disabled={!hasResults}
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* Empty State */}
      {!hasResults && (
        <div className="text-center py-8 text-muted-foreground animate-fade-in">
          <Zap className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Select appliances to see your power requirements</p>
        </div>
      )}
    </div>
  );
});
