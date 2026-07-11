export interface PipeData {
  size: number;
  outsideDiameter: number;
  schedule40Wall: number;
  schedule40ID: number;
  schedule80Wall: number;
  schedule80ID: number;
  weight40: number;
  weight80: number;
}

export const pipeCharts: PipeData[] = [
  { size: 0.5, outsideDiameter: 0.84, schedule40Wall: 0.109, schedule40ID: 0.622, schedule80Wall: 0.147, schedule80ID: 0.546, weight40: 0.85, weight80: 1.09 },
  { size: 0.75, outsideDiameter: 1.05, schedule40Wall: 0.113, schedule40ID: 0.824, schedule80Wall: 0.154, schedule80ID: 0.742, weight40: 1.13, weight80: 1.47 },
  { size: 1, outsideDiameter: 1.315, schedule40Wall: 0.133, schedule40ID: 1.049, schedule80Wall: 0.179, schedule80ID: 0.957, weight40: 1.68, weight80: 2.17 },
  { size: 1.25, outsideDiameter: 1.66, schedule40Wall: 0.14, schedule40ID: 1.38, schedule80Wall: 0.191, schedule80ID: 1.278, weight40: 2.27, weight80: 3.0 },
  { size: 1.5, outsideDiameter: 1.9, schedule40Wall: 0.145, schedule40ID: 1.61, schedule80Wall: 0.2, schedule80ID: 1.5, weight40: 2.72, weight80: 3.63 },
  { size: 2, outsideDiameter: 2.375, schedule40Wall: 0.154, schedule40ID: 2.067, schedule80Wall: 0.218, schedule80ID: 1.939, weight40: 3.65, weight80: 5.02 },
  { size: 2.5, outsideDiameter: 2.875, schedule40Wall: 0.203, schedule40ID: 2.469, schedule80Wall: 0.276, schedule80ID: 2.323, weight40: 5.79, weight80: 7.66 },
  { size: 3, outsideDiameter: 3.5, schedule40Wall: 0.216, schedule40ID: 3.068, schedule80Wall: 0.3, schedule80ID: 2.9, weight40: 7.58, weight80: 10.25 },
  { size: 4, outsideDiameter: 4.5, schedule40Wall: 0.237, schedule40ID: 4.026, schedule80Wall: 0.337, schedule80ID: 3.826, weight40: 10.79, weight80: 15.0 },
  { size: 5, outsideDiameter: 5.563, schedule40Wall: 0.258, schedule40ID: 5.047, schedule80Wall: 0.375, schedule80ID: 4.813, weight40: 14.62, weight80: 20.78 },
  { size: 6, outsideDiameter: 6.625, schedule40Wall: 0.28, schedule40ID: 6.065, schedule80Wall: 0.432, schedule80ID: 5.761, weight40: 18.97, weight80: 28.57 }
];

export function getPipeData(size: number, schedule: 40 | 80 = 40): PipeData | undefined {
  return pipeCharts.find(pipe => pipe.size === size);
}

export function getPipeWeight(size: number, schedule: 40 | 80, length: number): number {
  const pipe = getPipeData(size, schedule);
  if (!pipe) return 0;
  const weightPerFoot = schedule === 40 ? pipe.weight40 : pipe.weight80;
  return weightPerFoot * length;
}

export function getAllPipeSizes(): number[] {
  return pipeCharts.map(pipe => pipe.size);
}
