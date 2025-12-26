import { useState, useMemo, useCallback } from 'react';
import { appliances, inverterSizes, type ApplianceWithQuantity } from '@/data/appliances';

interface BatteryConfig {
  voltage: number;
  capacity: number;
  count: number;
  dod: number;
}

interface CalculationResult {
  totalLoad: number;
  peakSurge: number;
  requiredPower: number;
  requiredKva: number;
  recommendedInverter: number;
  backupHours: number;
  warnings: string[];
  recommendations: string[];
}

export function useCalculator() {
  const [selectedAppliances, setSelectedAppliances] = useState<ApplianceWithQuantity[]>(
    appliances.map(a => ({ ...a, quantity: 0 }))
  );

  const [batteryConfig, setBatteryConfig] = useState<BatteryConfig>({
    voltage: 24,
    capacity: 200,
    count: 2,
    dod: 0.8,
  });

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setSelectedAppliances(prev =>
      prev.map(a => (a.id === id ? { ...a, quantity: Math.max(0, quantity) } : a))
    );
  }, []);

  const resetAll = useCallback(() => {
    setSelectedAppliances(appliances.map(a => ({ ...a, quantity: 0 })));
  }, []);

  const calculations = useMemo((): CalculationResult => {
    const activeAppliances = selectedAppliances.filter(a => a.quantity > 0);

    // Total running load
    const totalLoad = activeAppliances.reduce(
      (sum, a) => sum + a.wattage * a.quantity,
      0
    );

    // Peak surge load (max surge from any single appliance type)
    const peakSurge = activeAppliances.reduce(
      (max, a) => Math.max(max, a.wattage * a.surge * a.quantity),
      0
    );

    // Required power with safety margin (30%)
    const requiredPower = (totalLoad + peakSurge) * 1.3;

    // Convert to kVA (power factor 0.8)
    const requiredKva = requiredPower / 800;

    // Find recommended inverter size
    const recommendedInverter = inverterSizes.find(size => size >= requiredKva) || inverterSizes[inverterSizes.length - 1];

    // Battery energy and backup hours
    const batteryEnergy =
      batteryConfig.voltage *
      batteryConfig.capacity *
      batteryConfig.count *
      batteryConfig.dod;
    const backupHours = totalLoad > 0 ? batteryEnergy / totalLoad : 0;

    // Generate warnings
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Check for high-drain combinations
    const hasAC = activeAppliances.some(a => a.id.startsWith('ac_'));
    const hasFridge = activeAppliances.some(a => a.id === 'refrigerator');
    const hasHeater = activeAppliances.some(a => a.id === 'space_heater');
    const hasMicrowave = activeAppliances.some(a => a.id === 'microwave');
    const hasIron = activeAppliances.some(a => a.id === 'iron');
    const hasKettle = activeAppliances.some(a => a.id === 'electric_kettle');

    if (hasAC && hasFridge) {
      warnings.push('Running AC and refrigerator together creates high surge demand');
    }

    if (hasHeater || hasIron || hasKettle) {
      warnings.push('Heating appliances drain batteries quickly');
    }

    if (hasAC && hasMicrowave) {
      warnings.push('Avoid running AC and microwave simultaneously');
    }

    if (peakSurge > requiredPower * 0.7) {
      warnings.push('High surge load detected - consider staggering startup');
    }

    // Generate recommendations
    if (totalLoad > 0) {
      if (backupHours < 2) {
        recommendations.push('Consider adding more batteries for longer backup');
      }

      if (requiredKva > 5) {
        recommendations.push('Large load detected - ensure proper ventilation for inverter');
      }

      if (activeAppliances.some(a => a.category === 'cooling' && a.quantity > 0)) {
        recommendations.push('Use inverter AC models for better efficiency');
      }

      if (recommendedInverter === inverterSizes[inverterSizes.length - 1] && requiredKva > recommendedInverter) {
        recommendations.push('Consider splitting load across multiple inverter systems');
      }

      if (totalLoad < 1000 && batteryConfig.voltage > 24) {
        recommendations.push('Lower voltage battery bank may be more cost-effective for this load');
      }
    }

    return {
      totalLoad,
      peakSurge,
      requiredPower,
      requiredKva: Math.ceil(requiredKva * 10) / 10,
      recommendedInverter,
      backupHours: Math.round(backupHours * 10) / 10,
      warnings,
      recommendations,
    };
  }, [selectedAppliances, batteryConfig]);

  const activeCount = useMemo(
    () => selectedAppliances.filter(a => a.quantity > 0).length,
    [selectedAppliances]
  );

  return {
    selectedAppliances,
    batteryConfig,
    setBatteryConfig,
    updateQuantity,
    resetAll,
    calculations,
    activeCount,
  };
}
