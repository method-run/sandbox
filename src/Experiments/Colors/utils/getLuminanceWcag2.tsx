import Color from "colorjs.io";
import { APCA_CONSTANTS_98G } from "./APCA_CONSTANTS_98G";

// RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
export const getLuminanceWcag2 = (color: Color) => {
  const srgb = color.to("srgb");
  const rgb = [srgb.r * 255, srgb.g * 255, srgb.b * 255];

  // Divide channel by 255, then apply gamma correction
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;

    if (c <= 0.03928) {
      return c / 12.92;
    } else {
      return Math.pow((c + 0.055) / 1.055, APCA_CONSTANTS_98G.mainTRC);
    }
  });

  return (
    APCA_CONSTANTS_98G.sRco * r +
    APCA_CONSTANTS_98G.sGco * g +
    APCA_CONSTANTS_98G.sBco * b
  );
};
