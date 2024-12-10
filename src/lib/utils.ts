export function fibonacci(iterations: number): number[] {
  if (iterations <= 0) return [];
  if (iterations === 1) return [0];

  const sequence: number[] = [0, 1];
  for (let i = 2; i < iterations; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
