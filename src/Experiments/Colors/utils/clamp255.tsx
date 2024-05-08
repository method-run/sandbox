export function clamp255(n: number) {
  return Math.min(255, Math.max(0, n));
}
