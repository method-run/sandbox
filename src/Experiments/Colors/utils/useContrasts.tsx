import { useMemo } from "react";
import { getContrastApca } from "./getContrastApca";
import { useColorLuminances } from "./useColorLuminances";
import { getContrastWcag2 } from "./getContrastWcag2";
import { Grade } from "./Grade";

export const getContrasts = ({
  bgYApca,
  txtYApca,
  bgYWcag2,
  txtYWcag2,
}: {
  bgYApca: number;
  txtYApca: number;
  bgYWcag2: number;
  txtYWcag2: number;
}) => {
  const contrastApca = getContrastApca({
    txtY: txtYApca,
    bgY: bgYApca,
  });

  const contrastWcag2 = getContrastWcag2({
    txtY: txtYWcag2,
    bgY: bgYWcag2,
  });

  return {
    bgYApca,
    txtYApca,
    bgYWcag2,
    txtYWcag2,
    contrastApca,
    contrastWcag2,
    gradeApca: new Grade(contrastApca, { apca: true }),
    gradeWcag2: new Grade(contrastWcag2, { wcag2: true }),
  };
};

export const useContrasts = (colorTxt: string, colorBg: string) => {
  const { yApca: txtYApca, yWcag2: txtYWcag2 } = useColorLuminances(colorTxt);
  const { yApca: bgYApca, yWcag2: bgYWcag2 } = useColorLuminances(colorBg);

  return useMemo(
    () =>
      getContrasts({
        bgYApca,
        bgYWcag2,
        txtYApca,
        txtYWcag2,
      }),
    [bgYApca, bgYWcag2, txtYApca, txtYWcag2]
  );
};
