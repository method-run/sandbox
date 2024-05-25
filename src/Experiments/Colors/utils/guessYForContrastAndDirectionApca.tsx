import { getContrastApca } from "./getContrastApca";
import { MAX_Y, MIN_Y } from "./Y_RANGE";

/**
 * Takes a starting Y value, a target contrast, and whether to
 * find a lighter or darker Y value. Returns a Y value that meets
 * the minimum contrast requirement as closely as possible, or
 * NaN if there's no valid Y value.
 */
export const guessYForContrastAndDirectionApca = ({
  direction,
  initY,
  ...restOpts
}: {
  /** Whether the target luminance should be lighter or darker than the starting luminance */
  direction: "toBlack" | "toWhite";
  /** The desired contrast ratio */
  targetMinContrast: number;
  /** The starting luminance */
  initY: number;
}): number =>
  _searchYForContrastAndDirectionApca({
    direction,
    initY,
    yMin: direction === "toBlack" ? MIN_Y : initY,
    yMax: direction === "toWhite" ? MAX_Y : initY,
    ...restOpts,
  });

const _searchYForContrastAndDirectionApca = ({
  attempt = 0,
  attemptsMax = 10,
  direction,
  errorMargin = 0.5,
  initY,
  targetMinContrast,
  yMin,
  yMax,
}: {
  /** Because this function is recursive, this keeps track of the current iteration count. */
  attempt?: number;
  /** Because this function is recursive, this is a stopgap to prevent infinite loops. */
  attemptsMax?: number;
  /** Whether the target luminance should be lighter or darker than the starting luminance */
  direction: "toBlack" | "toWhite";
  /** Because this function does a binary search without exact matches, specify the accuracy required */
  errorMargin?: number;
  /** The starting luminance */
  initY: number;
  /** The desired contrast ratio */
  targetMinContrast: number;
  yMin: number;
  yMax: number;
}): number => {
  const y = (yMin + yMax) / 2;

  const contrast1 = Math.abs(
    getContrastApca({
      txtY: initY,
      bgY: y,
    })
  );

  const contrast2 = Math.abs(
    getContrastApca({
      txtY: initY,
      bgY: y,
    })
  );

  const contrast = Math.min(contrast1, contrast2);
  const errorActual = Math.abs(targetMinContrast - contrast);

  if (attempt > attemptsMax) {
    return y;
  }

  if (errorActual < errorMargin) {
    return y;
  }

  let nextYMin = yMin;
  let nextYMax = yMax;

  if (contrast < targetMinContrast) {
    // Move closer to the edge
    if (direction === "toBlack") {
      nextYMax = y;
    } else {
      nextYMin = y;
    }
  }

  if (contrast > targetMinContrast) {
    // Move closer to the init y
    if (direction === "toBlack") {
      nextYMin = y;
    } else {
      nextYMax = y;
    }
  }

  return _searchYForContrastAndDirectionApca({
    attempt: attempt + 1,
    attemptsMax,
    direction,
    errorMargin,
    targetMinContrast,
    initY,
    yMax: nextYMax,
    yMin: nextYMin,
  });
};
