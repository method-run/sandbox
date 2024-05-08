/**
 * Take luminances for txt and bg, return contrast. Contrast may be negative.
 * txtY and bgY must be between 0.0-1.0
 * IMPORTANT: Do not swap, polarity is important.
 */
export const getContrastWcag2 = ({
  txtY,
  bgY,
}: {
  txtY: number;
  bgY: number;
}): number => {
  const [darkY, lightY] = [txtY, bgY].sort();
  const outputContrast = (lightY + 0.05) / (darkY + 0.05);

  if (txtY > bgY) {
    return -outputContrast;
  }
  return outputContrast;
};
