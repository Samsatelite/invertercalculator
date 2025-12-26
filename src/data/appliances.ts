export interface Appliance {
  id: string;
  name: string;
  wattage: number;
  surge: number;
  category: string;
  icon: string;
}

export interface ApplianceWithQuantity extends Appliance {
  quantity: number;
}

export const applianceCategories = [
  { id: 'cooling', name: 'Cooling & Heating', icon: 'Thermometer' },
  { id: 'kitchen', name: 'Kitchen', icon: 'UtensilsCrossed' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Tv' },
  { id: 'lighting', name: 'Lighting', icon: 'Lightbulb' },
  { id: 'office', name: 'Office & Work', icon: 'Monitor' },
  { id: 'utilities', name: 'Utilities', icon: 'Zap' },
];

export const appliances: Appliance[] = [
  // Cooling & Heating
  { id: 'ac_1hp', name: 'Air Conditioner 1 HP', wattage: 900, surge: 3, category: 'cooling', icon: 'AirVent' },
  { id: 'ac_15hp', name: 'Air Conditioner 1.5 HP', wattage: 1200, surge: 3, category: 'cooling', icon: 'AirVent' },
  { id: 'ac_2hp', name: 'Air Conditioner 2 HP', wattage: 1800, surge: 3, category: 'cooling', icon: 'AirVent' },
  { id: 'ceiling_fan', name: 'Ceiling Fan', wattage: 75, surge: 1.5, category: 'cooling', icon: 'Fan' },
  { id: 'standing_fan', name: 'Standing Fan', wattage: 55, surge: 1.5, category: 'cooling', icon: 'Fan' },
  { id: 'space_heater', name: 'Space Heater', wattage: 1500, surge: 1, category: 'cooling', icon: 'Flame' },

  // Kitchen
  { id: 'refrigerator', name: 'Refrigerator', wattage: 150, surge: 3, category: 'kitchen', icon: 'Refrigerator' },
  { id: 'freezer', name: 'Deep Freezer', wattage: 200, surge: 3, category: 'kitchen', icon: 'Snowflake' },
  { id: 'microwave', name: 'Microwave Oven', wattage: 1200, surge: 2, category: 'kitchen', icon: 'Microwave' },
  { id: 'electric_kettle', name: 'Electric Kettle', wattage: 1500, surge: 1, category: 'kitchen', icon: 'Coffee' },
  { id: 'blender', name: 'Blender', wattage: 400, surge: 3, category: 'kitchen', icon: 'Blend' },
  { id: 'toaster', name: 'Toaster', wattage: 800, surge: 1, category: 'kitchen', icon: 'Cookie' },

  // Entertainment
  { id: 'tv_32', name: 'LED TV 32"', wattage: 50, surge: 1, category: 'entertainment', icon: 'Tv' },
  { id: 'tv_55', name: 'LED TV 55"', wattage: 120, surge: 1, category: 'entertainment', icon: 'Tv' },
  { id: 'sound_system', name: 'Sound System', wattage: 100, surge: 1.5, category: 'entertainment', icon: 'Speaker' },
  { id: 'gaming_console', name: 'Gaming Console', wattage: 200, surge: 1, category: 'entertainment', icon: 'Gamepad2' },
  { id: 'decoder', name: 'Cable/Satellite Decoder', wattage: 25, surge: 1, category: 'entertainment', icon: 'Radio' },

  // Lighting
  { id: 'led_bulb', name: 'LED Bulb (9W)', wattage: 9, surge: 1, category: 'lighting', icon: 'Lightbulb' },
  { id: 'fluorescent', name: 'Fluorescent Tube', wattage: 40, surge: 1.2, category: 'lighting', icon: 'Lightbulb' },
  { id: 'outdoor_light', name: 'Outdoor Light', wattage: 60, surge: 1, category: 'lighting', icon: 'Sun' },

  // Office
  { id: 'laptop', name: 'Laptop', wattage: 65, surge: 1, category: 'office', icon: 'Laptop' },
  { id: 'desktop', name: 'Desktop Computer', wattage: 250, surge: 1.5, category: 'office', icon: 'Monitor' },
  { id: 'printer', name: 'Printer', wattage: 150, surge: 2, category: 'office', icon: 'Printer' },
  { id: 'router', name: 'WiFi Router', wattage: 15, surge: 1, category: 'office', icon: 'Wifi' },

  // Utilities
  { id: 'washing_machine', name: 'Washing Machine', wattage: 500, surge: 3, category: 'utilities', icon: 'WashingMachine' },
  { id: 'iron', name: 'Electric Iron', wattage: 1200, surge: 1, category: 'utilities', icon: 'Shirt' },
  { id: 'water_pump', name: 'Water Pump (1HP)', wattage: 750, surge: 3, category: 'utilities', icon: 'Droplets' },
  { id: 'vacuum', name: 'Vacuum Cleaner', wattage: 1000, surge: 2, category: 'utilities', icon: 'Wind' },
  { id: 'phone_charger', name: 'Phone Charger', wattage: 10, surge: 1, category: 'utilities', icon: 'Smartphone' },
];

export const inverterSizes = [1.5, 2.5, 3.5, 5, 7.5, 10, 15, 20];

export const batteryConfigs = {
  voltages: [12, 24, 48],
  capacities: [100, 150, 200, 220],
};
