import { useCallback, useMemo, useState } from "react";
import { useColorLuminances } from "../utils/useColorLuminances";
import classes from "./Scale.module.css";
import Color from "colorjs.io";
import { useContrasts } from "../utils/useContrasts";
import { COLOR } from "../utils/COLOR";

export const Scale = () => {
  const [colorBase, setColorBase] = useState(
    COLOR.eigengrau.toString({ collapse: false, format: "hex" })
  );

  const handleChangeBase = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setColorBase(e.target.value);
    },
    []
  );

  const { yApca, yWcag2 } = useColorLuminances(colorBase);

  const handleBlurInput = useCallback(() => {
    // Consider using this to hold off repositioning the input until the change is committed.
    // Doesn't seem necessary because native Android and Mac Chrome browser color inputs
    // already have intermediate UI that doesn't shift until it's closed.
    // console.log("blurInput");
  }, []);

  const { l, c, h } = useMemo(() => {
    const color = new Color(colorBase).to("oklch");

    return {
      l: color.l,
      c: color.c,
      h: color.h,
    };
  }, [colorBase]);

  const blackOnBaseContrasts = useContrasts("black", colorBase);
  const baseOnBlackContrasts = useContrasts(colorBase, "black");
  const whiteOnBaseContrasts = useContrasts("white", colorBase);
  const baseOnWhiteContrasts = useContrasts(colorBase, "white");

  const edgeContrasts = useMemo(() => {
    const maxBlackContrastApca = [
      blackOnBaseContrasts.gradeApca,
      baseOnBlackContrasts.gradeApca,
    ].sort()[0];

    const maxWhiteContrastApca = [
      whiteOnBaseContrasts.gradeApca,
      baseOnWhiteContrasts.gradeApca,
    ].sort()[0];

    const maxBlackContrastWcag2 = [
      blackOnBaseContrasts.gradeWcag2,
      baseOnBlackContrasts.gradeWcag2,
    ].sort()[0];

    const maxWhiteContrastWcag2 = [
      whiteOnBaseContrasts.gradeWcag2,
      baseOnWhiteContrasts.gradeWcag2,
    ].sort()[0];

    return {
      blackApca: maxBlackContrastApca,
      blackWcag2: maxBlackContrastWcag2,
      whiteApca: maxWhiteContrastApca,
      whiteWcag2: maxWhiteContrastWcag2,
    };
  }, [
    baseOnBlackContrasts.gradeApca,
    baseOnBlackContrasts.gradeWcag2,
    baseOnWhiteContrasts.gradeApca,
    baseOnWhiteContrasts.gradeWcag2,
    blackOnBaseContrasts.gradeApca,
    blackOnBaseContrasts.gradeWcag2,
    whiteOnBaseContrasts.gradeApca,
    whiteOnBaseContrasts.gradeWcag2,
  ]);

  return (
    <>
      <div className={classes.scale}>
        <style>{`
        .${classes.scale} {
          --okc: ${c};
          --okh: ${h};
          --okl: ${l};
        }
        `}</style>
        <div className={classes.gradientWrapper}>
          <div className={classes.gradient}>
            <input
              className={classes.input}
              name="base"
              type="color"
              value={colorBase}
              onChange={handleChangeBase}
              onBlur={handleBlurInput}
            />
          </div>
        </div>
      </div>
      <dl>
        <dt>Luminance</dt>
        <dd>{yApca}</dd>
        <dt>WCAG2 Luminance</dt>
        <dd>{yWcag2}</dd>
        <dt>Black passes APCA</dt>
        <dd>{edgeContrasts.blackApca.value}</dd>
        <dt>Black passes WCAG2</dt>
        <dd>{edgeContrasts.blackWcag2.value}</dd>
        <dt>White passes APCA</dt>
        <dd>{edgeContrasts.whiteApca.value}</dd>
        <dt>White passes WCAG2</dt>
        <dd>{edgeContrasts.whiteWcag2.value}</dd>
      </dl>
    </>
  );
};
