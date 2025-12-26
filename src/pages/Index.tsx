import { useMemo } from 'react';
import { Header } from '@/components/Header';
import { CategorySection } from '@/components/CategorySection';
import { BatteryConfig } from '@/components/BatteryConfig';
import { ResultsPanel } from '@/components/ResultsPanel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCalculator } from '@/hooks/useCalculator';
import { applianceCategories } from '@/data/appliances';
import { downloadPDF } from '@/utils/pdfGenerator';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const {
    selectedAppliances,
    batteryConfig,
    setBatteryConfig,
    updateQuantity,
    resetAll,
    calculations,
    activeCount,
  } = useCalculator();

  const appliancesByCategory = useMemo(() => {
    return applianceCategories.map(cat => ({
      ...cat,
      appliances: selectedAppliances.filter(a => a.category === cat.id),
    }));
  }, [selectedAppliances]);

  const handleDownloadPDF = () => {
    downloadPDF({
      appliances: selectedAppliances,
      batteryConfig,
      calculations,
    });
  };

  return (
    <>
      <Helmet>
        <title>Solar Load Calculator - Plan Your Inverter & Battery Setup</title>
        <meta 
          name="description" 
          content="Calculate your solar inverter size and battery requirements. Select your appliances and get instant recommendations for your power backup system." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Background glow effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <Header />

        <main className="container mx-auto px-4 py-6 relative">
          <div className="grid lg:grid-cols-[1fr,380px] gap-6">
            {/* Left Column - Appliance Selection */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Select Your Appliances
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose the appliances you want to power during backup
                  </p>
                </div>
                {activeCount > 0 && (
                  <div className="text-sm font-medium text-primary">
                    {activeCount} appliance{activeCount !== 1 ? 's' : ''} selected
                  </div>
                )}
              </div>

              <ScrollArea className="h-[calc(100vh-220px)] pr-4">
                <div className="space-y-8 pb-6">
                  {appliancesByCategory.map(cat => (
                    <CategorySection
                      key={cat.id}
                      categoryId={cat.id}
                      appliances={cat.appliances}
                      onUpdateQuantity={updateQuantity}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Right Column - Results & Config */}
            <div className="lg:sticky lg:top-24 lg:h-fit space-y-4">
              <BatteryConfig
                config={batteryConfig}
                onConfigChange={setBatteryConfig}
              />
              
              <div className="glass-card rounded-xl p-5">
                <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="text-gradient">Calculation Results</span>
                </h3>
                <ResultsPanel
                  calculations={calculations}
                  activeCount={activeCount}
                  onReset={resetAll}
                  onDownloadPDF={handleDownloadPDF}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
