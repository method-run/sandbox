import Color from "colorjs.io";
import { APCA_CONSTANTS_98G } from "./APCA_CONSTANTS_98G";
import { clamp255 } from "./clamp255";

/**
 * For r, g, b values from 0-255: clamp, linearize, apply coefficients, sum, then
 * return the resulting luminance.
 */
export function getLuminanceApca(color: Color) {
  const srgb = color.to("srgb");
  const [r, g, b] = [srgb.r * 255, srgb.g * 255, srgb.b * 255];

  return (
    APCA_CONSTANTS_98G.sRco * _simpleExp(clamp255(r)) +
    APCA_CONSTANTS_98G.sGco * _simpleExp(clamp255(g)) +
    APCA_CONSTANTS_98G.sBco * _simpleExp(clamp255(b))
  );
}

function _simpleExp(chan: number) {
  return Math.pow(chan / 255.0, APCA_CONSTANTS_98G.mainTRC);
}
