export type UnitCategory =
  | 'length'
  | 'mass'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'speed'
  | 'time'
  | 'data'
  | 'energy'
  | 'pressure';

export interface UnitDefinition {
  id: string;
  name: string;
  factorToBase: number; // Multiply by this factor to convert to base unit
  symbol: string;
}

export const UNIT_CATEGORIES: { id: UnitCategory; label: string; baseUnit: string }[] = [
  { id: 'length', label: 'Length & Distance', baseUnit: 'meters' },
  { id: 'mass', label: 'Weight & Mass', baseUnit: 'grams' },
  { id: 'temperature', label: 'Temperature', baseUnit: 'celsius' },
  { id: 'area', label: 'Area', baseUnit: 'square_meters' },
  { id: 'volume', label: 'Volume & Liquid', baseUnit: 'liters' },
  { id: 'speed', label: 'Speed & Velocity', baseUnit: 'meters_per_second' },
  { id: 'time', label: 'Time Duration', baseUnit: 'seconds' },
  { id: 'data', label: 'Digital Data Storage', baseUnit: 'bytes' },
  { id: 'energy', label: 'Energy & Work', baseUnit: 'joules' },
  { id: 'pressure', label: 'Pressure', baseUnit: 'pascals' },
];

export const UNITS_DATA: Record<UnitCategory, UnitDefinition[]> = {
  length: [
    { id: 'mm', name: 'Millimeters', factorToBase: 0.001, symbol: 'mm' },
    { id: 'cm', name: 'Centimeters', factorToBase: 0.01, symbol: 'cm' },
    { id: 'm', name: 'Meters (Base)', factorToBase: 1, symbol: 'm' },
    { id: 'km', name: 'Kilometers', factorToBase: 1000, symbol: 'km' },
    { id: 'in', name: 'Inches', factorToBase: 0.0254, symbol: 'in' },
    { id: 'ft', name: 'Feet', factorToBase: 0.3048, symbol: 'ft' },
    { id: 'yd', name: 'Yards', factorToBase: 0.9144, symbol: 'yd' },
    { id: 'mi', name: 'Miles', factorToBase: 1609.344, symbol: 'mi' },
  ],
  mass: [
    { id: 'mg', name: 'Milligrams', factorToBase: 0.001, symbol: 'mg' },
    { id: 'g', name: 'Grams (Base)', factorToBase: 1, symbol: 'g' },
    { id: 'kg', name: 'Kilograms', factorToBase: 1000, symbol: 'kg' },
    { id: 'oz', name: 'Ounces', factorToBase: 28.3495, symbol: 'oz' },
    { id: 'lb', name: 'Pounds', factorToBase: 453.592, symbol: 'lb' },
    { id: 'tonne', name: 'Metric Tonnes', factorToBase: 1000000, symbol: 't' },
  ],
  temperature: [
    { id: 'c', name: 'Celsius', factorToBase: 1, symbol: '°C' },
    { id: 'f', name: 'Fahrenheit', factorToBase: 1, symbol: '°F' },
    { id: 'k', name: 'Kelvin', factorToBase: 1, symbol: 'K' },
  ],
  area: [
    { id: 'sq_m', name: 'Square Meters (Base)', factorToBase: 1, symbol: 'm²' },
    { id: 'sq_km', name: 'Square Kilometers', factorToBase: 1000000, symbol: 'km²' },
    { id: 'sq_ft', name: 'Square Feet', factorToBase: 0.092903, symbol: 'ft²' },
    { id: 'sq_in', name: 'Square Inches', factorToBase: 0.00064516, symbol: 'in²' },
    { id: 'acre', name: 'Acres', factorToBase: 4046.86, symbol: 'ac' },
    { id: 'hectare', name: 'Hectares', factorToBase: 10000, symbol: 'ha' },
  ],
  volume: [
    { id: 'ml', name: 'Milliliters', factorToBase: 0.001, symbol: 'mL' },
    { id: 'l', name: 'Liters (Base)', factorToBase: 1, symbol: 'L' },
    { id: 'cup', name: 'US Cups', factorToBase: 0.236588, symbol: 'cup' },
    { id: 'pt', name: 'US Pints', factorToBase: 0.473176, symbol: 'pt' },
    { id: 'gal', name: 'US Gallons', factorToBase: 3.78541, symbol: 'gal' },
    { id: 'cu_m', name: 'Cubic Meters', factorToBase: 1000, symbol: 'm³' },
  ],
  speed: [
    { id: 'mps', name: 'Meters per Second', factorToBase: 1, symbol: 'm/s' },
    { id: 'kph', name: 'Kilometers per Hour', factorToBase: 0.277778, symbol: 'km/h' },
    { id: 'mph', name: 'Miles per Hour', factorToBase: 0.44704, symbol: 'mph' },
    { id: 'knot', name: 'Knots (Nautical)', factorToBase: 0.514444, symbol: 'kn' },
  ],
  time: [
    { id: 'ms', name: 'Milliseconds', factorToBase: 0.001, symbol: 'ms' },
    { id: 'sec', name: 'Seconds (Base)', factorToBase: 1, symbol: 's' },
    { id: 'min', name: 'Minutes', factorToBase: 60, symbol: 'min' },
    { id: 'hr', name: 'Hours', factorToBase: 3600, symbol: 'hr' },
    { id: 'day', name: 'Days', factorToBase: 86400, symbol: 'd' },
    { id: 'week', name: 'Weeks', factorToBase: 604800, symbol: 'wk' },
  ],
  data: [
    { id: 'b', name: 'Bytes (Base)', factorToBase: 1, symbol: 'B' },
    { id: 'kb', name: 'Kilobytes (1000 B)', factorToBase: 1000, symbol: 'KB' },
    { id: 'mb', name: 'Megabytes (1000 KB)', factorToBase: 1000000, symbol: 'MB' },
    { id: 'gb', name: 'Gigabytes (1000 MB)', factorToBase: 1000000000, symbol: 'GB' },
    { id: 'tb', name: 'Terabytes (1000 GB)', factorToBase: 1000000000000, symbol: 'TB' },
    { id: 'kib', name: 'Kibibytes (1024 B)', factorToBase: 1024, symbol: 'KiB' },
    { id: 'mib', name: 'Mebibytes (1024 KiB)', factorToBase: 1048576, symbol: 'MiB' },
    { id: 'gib', name: 'Gibibytes (1024 MiB)', factorToBase: 1073741824, symbol: 'GiB' },
    { id: 'tib', name: 'Tebibytes (1024 GiB)', factorToBase: 1099511627776, symbol: 'TiB' },
  ],
  energy: [
    { id: 'j', name: 'Joules (Base)', factorToBase: 1, symbol: 'J' },
    { id: 'kj', name: 'Kilojoules', factorToBase: 1000, symbol: 'kJ' },
    { id: 'cal', name: 'Gram Calories', factorToBase: 4.184, symbol: 'cal' },
    { id: 'kcal', name: 'Kilocalories (Food)', factorToBase: 4184, symbol: 'kcal' },
    { id: 'wh', name: 'Watt-Hours', factorToBase: 3600, symbol: 'Wh' },
    { id: 'kwh', name: 'Kilowatt-Hours', factorToBase: 3600000, symbol: 'kWh' },
  ],
  pressure: [
    { id: 'pa', name: 'Pascals (Base)', factorToBase: 1, symbol: 'Pa' },
    { id: 'kpa', name: 'Kilopascals', factorToBase: 1000, symbol: 'kPa' },
    { id: 'bar', name: 'Bars', factorToBase: 100000, symbol: 'bar' },
    { id: 'psi', name: 'Pounds per Sq. Inch', factorToBase: 6894.76, symbol: 'psi' },
    { id: 'atm', name: 'Standard Atmospheres', factorToBase: 101325, symbol: 'atm' },
  ],
};

export function convertGeneralUnit(
  category: UnitCategory,
  fromUnitId: string,
  toUnitId: string,
  value: number
): number {
  if (category === 'temperature') {
    // Temperature special formulas
    let celsius = value;
    if (fromUnitId === 'f') celsius = ((value - 32) * 5) / 9;
    if (fromUnitId === 'k') celsius = value - 273.15;

    if (toUnitId === 'c') return celsius;
    if (toUnitId === 'f') return (celsius * 9) / 5 + 32;
    if (toUnitId === 'k') return celsius + 273.15;
    return celsius;
  }

  const categoryUnits = UNITS_DATA[category];
  const fromUnit = categoryUnits.find((u) => u.id === fromUnitId);
  const toUnit = categoryUnits.find((u) => u.id === toUnitId);

  if (!fromUnit || !toUnit) return value;

  const baseValue = value * fromUnit.factorToBase;
  return baseValue / toUnit.factorToBase;
}
