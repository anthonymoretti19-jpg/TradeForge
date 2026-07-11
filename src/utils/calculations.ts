import Decimal from 'decimal.js';

export const fittingAllowances: Record<string, Record<number, number>> = {
  '45': {
    0.5: 0.375,
    0.75: 0.5,
    1: 0.75,
    1.25: 0.875,
    1.5: 1.0,
    2: 1.25,
    2.5: 1.5,
    3: 1.875,
    4: 2.375,
    5: 2.875,
    6: 3.375
  },
  '90': {
    0.5: 0.75,
    0.75: 0.875,
    1: 1.0,
    1.25: 1.25,
    1.5: 1.5,
    2: 1.875,
    2.5: 2.25,
    3: 2.875,
    4: 3.75,
    5: 4.5,
    6: 5.25
  }
};

export function getFittingAllowance(pipeSize: number, angle: 45 | 90): number {
  const angleKey = angle.toString();
  return fittingAllowances[angleKey]?.[pipeSize] || 0;
}

export function calculateOffset(rise: number, run: number) {
  const centerLine = Math.sqrt(rise * rise + run * run);
  const center45 = new Decimal(centerLine).times(1.414).toNumber();
  const center90 = Math.max(rise, run);
  const cutLength45 = center45 - 2 * getFittingAllowance(1, 45);
  const cutLength90 = center90 - 2 * getFittingAllowance(1, 90);

  return {
    centerLine,
    center45,
    center90,
    cutLength45,
    cutLength90
  };
}

export function calculateRollingOffset(rise: number, run: number, travel: number) {
  const offsetDiagonal = Math.sqrt(rise * rise + run * run);
  const fitDiagonal = Math.sqrt(offsetDiagonal * offsetDiagonal + travel * travel);
  const travelAngle = Math.atan(offsetDiagonal / travel) * (180 / Math.PI);
  const riseBend = Math.sqrt(2) * rise;
  const runBend = Math.sqrt(2) * run;
  const travelBend = Math.sqrt(2) * travel;

  return {
    offsetDiagonal,
    fitDiagonal,
    travelAngle,
    riseBend,
    runBend,
    travelBend
  };
}

export function calculateGasPipeSize(btus: number, length: number, pressure: number = 0.5) {
  const pipeSizes: Record<string, number> = {
    '0.5': 35,
    '0.75': 55,
    '1': 140,
    '1.25': 320,
    '1.5': 630,
    '2': 1550,
    '2.5': 3050,
    '3': 5550
  };

  const lengthFactor = Math.sqrt(60 / length);
  const adjustedBtu = btus / lengthFactor;

  let selectedSize = '2';
  for (const [size, capacity] of Object.entries(pipeSizes)) {
    if (adjustedBtu <= capacity * pressure) {
      selectedSize = size;
      break;
    }
  }

  const pressureDrop = (adjustedBtu / (pipeSizes[selectedSize] || 1550)) * pressure;
  const velocity = adjustedBtu / 3600;

  return {
    pipeSize: selectedSize,
    pressureDrop,
    velocity
  };
}

export function convertUnits(value: number, from: string, to: string): number {
  const conversions: Record<string, Record<string, number>> = {
    inches: {
      feet: value / 12,
      mm: value * 25.4,
      cm: value * 2.54
    },
    feet: {
      inches: value * 12,
      meters: value * 0.3048,
      mm: value * 304.8
    },
    mm: {
      inches: value / 25.4,
      feet: value / 304.8,
      cm: value / 10
    }
  };

  return conversions[from]?.[to] ?? value;
}

export function fractionToDecimal(whole: number, numerator: number, denominator: number): number {
  return whole + numerator / denominator;
}

export function decimalToFraction(decimal: number) {
  const whole = Math.floor(decimal);
  const remainder = decimal - whole;
  let denominator = 16;
  const numerator = Math.round(remainder * denominator);

  return {
    whole,
    numerator: numerator === 16 ? 0 : numerator,
    denominator: numerator === 16 ? 1 : denominator
  };
}

export function calculateBTU(tons: number): number {
  return tons * 12000;
}

export function calculatePressureDrop(flowRate: number, pipeSize: number, length: number): number {
  const constant = 0.002083;
  const friction = 100;
  return constant * Math.pow(flowRate, 1.85) * length / (Math.pow(pipeSize, 4.865) * Math.pow(friction, 1.85));
}
