import Color from "colorjs.io";
import { useMemo } from "react";
import { getLuminanceApca } from "./getLuminanceApca";
import { getLuminanceWcag2 } from "./getLuminanceWcag2";

export const getColorLuminances = (color: Color | string) => {
  const _color = new Color(color);

  return {
    yApca: getLuminanceApca(_color),
    yWcag2: getLuminanceWcag2(_color),
  };
};

export const useColorLuminances = (color: Color | string) =>
  useMemo(() => getColorLuminances(color), [color]);
