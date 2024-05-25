import Color from "colorjs.io";
import { getLuminanceApca } from "./getLuminanceApca";

/**
 * Takes a starting color and a target luminance (Y). Returns a color value that
 * approaches the luminance requirement as closely as possible.
 */
export const guessColorForYApca = ({
  initColor,
  y,
  ...restOpts
}: {
  /** The starting color */
  initColor: Color;
  /** The desired luminance */
  y: number;
}): Color => {
  const { c, h } = initColor.to("oklch");

  return _searchColorForYApca({
    c,
    h,
    lMax: 1,
    lMin: 0,
    targetY: y,
    ...restOpts,
  });
};

const _searchColorForYApca = ({
  attempt = 0,
  attemptsMax = 10,
  c,
  errorMargin = 0.005,
  h,
  lMax = 1,
  lMin = 0,
  targetY,
}: {
  /** Because this function is recursive, this keeps track of the current iteration count. */
  attempt?: number;
  /** Because this function is recursive, this is a stopgap to prevent infinite loops. */
  attemptsMax?: number;
  /** The chroma from the oklch space */
  c: number;
  /** Because this function does a binary search without exact matches, specify the accuracy required */
  errorMargin?: number;
  /** The hue from the oklch space */
  h: number;
  /** The max luminance for this iteration */
  lMax: number;
  /** The min luminance for this iteration */
  lMin: number;
  /** The desired luminance */
  targetY: number;
}): Color => {
  const l = (lMin + lMax) / 2;
  const color = new Color("black").to("oklch");
  color.l = l;
  color.c = c;
  color.h = h;
  const y = getLuminanceApca(color);
  const errorActual = Math.abs(targetY - y);

  if (attempt > attemptsMax) {
    return color;
  }

  if (errorActual < errorMargin) {
    return color;
  }

  let nextLMin = lMin;
  let nextLMax = lMax;

  if (y < targetY) {
    // Narrow range to lighter colors
    nextLMin = l;
  }

  if (y > targetY) {
    // Narrow range to darker colors
    nextLMax = l;
  }

  return _searchColorForYApca({
    attempt: attempt + 1,
    attemptsMax,
    c,
    errorMargin,
    h,
    lMax: nextLMax,
    lMin: nextLMin,
    targetY,
  });
};
