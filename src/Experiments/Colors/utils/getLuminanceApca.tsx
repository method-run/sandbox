import { APCA_CONSTANTS_98G } from "./APCA_CONSTANTS_98G";
import { clamp255 } from "./clamp255";

/**
 * For r, g, b values from 0-255: clamp, linearize, apply coefficients, sum, then
 * return the resulting luminance.
 */
export function getLuminanceApca([r, g, b] = [0, 0, 0]) {
  function simpleExp(chan: number) {
    return Math.pow(chan / 255.0, APCA_CONSTANTS_98G.mainTRC);
  }

  return (
    APCA_CONSTANTS_98G.sRco * simpleExp(clamp255(r)) +
    APCA_CONSTANTS_98G.sGco * simpleExp(clamp255(g)) +
    APCA_CONSTANTS_98G.sBco * simpleExp(clamp255(b))
  );
}
