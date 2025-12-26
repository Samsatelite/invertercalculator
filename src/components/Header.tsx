import { memo } from 'react';
import { Zap, Sun } from 'lucide-react';

export const Header = memo(function Header() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
              <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Sun className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                Solar Load Calculator
              </h1>
              <p className="text-xs text-muted-foreground">
                Plan your inverter & battery setup
              </p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span>Real-time calculations</span>
          </div>
        </div>
      </div>
    </header>
  );
});
