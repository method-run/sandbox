import Color from "colorjs.io";
import { useMemo } from "react";
import { getLuminanceApca } from "./getLuminanceApca";
import { getLuminanceWcag2 } from "./getLuminanceWcag2";

export const getColorLuminances = (color: string) => {
  const { r, g, b } = new Color(color).to("srgb");

  return {
    yApca: getLuminanceApca([r * 255, g * 255, b * 255]),
    yWcag2: getLuminanceWcag2([r * 255, g * 255, b * 255]),
  };
};

export const useColorLuminances = (color: string) =>
  useMemo(() => getColorLuminances(color), [color]);
