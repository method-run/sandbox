import Color from "colorjs.io";
import { useCallback, useMemo, useState } from "react";
import { COLOR } from "../utils/COLOR";
import { Grade, GradeCategory } from "../utils/Grade";
import { useColorLuminances } from "../utils/useColorLuminances";
import { useContrasts } from "../utils/useContrasts";
import classes from "./Scale.module.css";
import { guessYForContrastAndDirectionApca } from "../utils/guessYForContrastAndDirectionApca";
import { guessColorForYApca } from "../utils/guessColorForYApca";
import { guessYForContrastAndDirectionWcag2 } from "../utils/guessYForContrastAndDirectionWcag2";
import { guessColorForYWcag2 } from "../utils/guessColorForYWcag2";

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

  const color = useMemo(() => new Color(colorBase), [colorBase]);

  const {
    l,
    c,
    h = 0,
  } = useMemo(() => {
    const colorOkLch = color.to("oklch");

    return {
      l: colorOkLch.l,
      c: colorOkLch.c,
      h: colorOkLch.h || 0,
    };
  }, [color]);

  const blackOnBaseContrasts = useContrasts("black", colorBase);
  const baseOnBlackContrasts = useContrasts(colorBase, "black");
  const whiteOnBaseContrasts = useContrasts("white", colorBase);
  const baseOnWhiteContrasts = useContrasts(colorBase, "white");

  const edgeContrasts: {
    blackApca: Grade;
    blackWcag2: Grade;
    whiteApca: Grade;
    whiteWcag2: Grade;
  } = useMemo(() => {
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

  const yByMinGradeCategoryToBlackApca = useMemo(
    () =>
      _getYByMinGradeCategoryWithDirectionApca({
        direction: "toBlack",
        edgeContrasts,
        initY: yApca,
      }),
    [edgeContrasts, yApca]
  );

  const yByMinGradeCategoryToWhiteApca = useMemo(
    () =>
      _getYByMinGradeCategoryWithDirectionApca({
        direction: "toWhite",
        edgeContrasts,
        initY: yApca,
      }),
    [edgeContrasts, yApca]
  );

  const colorsWithGradeCategoryApca = useMemo<
    Array<{
      color: Color;
      gradeCategory: GradeCategory;
    }>
  >(() => {
    const _colorsWithGradeCategoryApca: Array<{
      color: Color;
      gradeCategory: GradeCategory;
    }> = [];

    for (const [gradeCategory, y] of [
      ...yByMinGradeCategoryToBlackApca,
      ...yByMinGradeCategoryToWhiteApca,
    ]) {
      const _color = guessColorForYApca({
        initColor: color,
        y,
      });

      _colorsWithGradeCategoryApca.push({
        color: _color,
        gradeCategory,
      });
    }

    return _colorsWithGradeCategoryApca;
  }, [color, yByMinGradeCategoryToBlackApca, yByMinGradeCategoryToWhiteApca]);

  const yByMinGradeCategoryToBlackWcag2 = useMemo(
    () =>
      _getYByMinGradeCategoryWithDirectionWcag2({
        direction: "toBlack",
        edgeContrasts,
        initY: yWcag2,
      }),
    [edgeContrasts, yWcag2]
  );

  const yByMinGradeCategoryToWhiteWcag2 = useMemo(
    () =>
      _getYByMinGradeCategoryWithDirectionWcag2({
        direction: "toWhite",
        edgeContrasts,
        initY: yWcag2,
      }),
    [edgeContrasts, yWcag2]
  );

  const colorsWithGradeCategoryWcag2 = useMemo<
    Array<{
      color: Color;
      gradeCategory: GradeCategory;
    }>
  >(() => {
    const _colorsWithGradeCategoryWcag2: Array<{
      color: Color;
      gradeCategory: GradeCategory;
    }> = [];

    for (const [gradeCategory, y] of [
      ...yByMinGradeCategoryToBlackWcag2,
      ...yByMinGradeCategoryToWhiteWcag2,
    ]) {
      const _color = guessColorForYWcag2({
        initColor: color,
        y,
      });

      _colorsWithGradeCategoryWcag2.push({
        color: _color,
        gradeCategory,
      });
    }

    return _colorsWithGradeCategoryWcag2;
  }, [color, yByMinGradeCategoryToBlackWcag2, yByMinGradeCategoryToWhiteWcag2]);

  return (
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
          {colorsWithGradeCategoryApca.map(
            ({ color: spotColor, gradeCategory }) => (
              <div
                key={spotColor.toString()}
                className={classes.spotWrapper + " " + classes.spotWrapperApca}
                /* @ts-expect-error React doesn't recognize custom property names as style properties */
                style={{ "--okl": spotColor.to("oklch").l }}
              >
                <div className={classes.spot}>
                  <div className={classes.spotTip}>
                    APCA {gradeCategory.valueOf()} (
                    {Grade.toMinContrastApca(gradeCategory)})
                    <br />
                    {spotColor
                      .to("srgb")
                      .toString({ collapse: false, format: "hex" })}
                  </div>
                </div>
              </div>
            )
          )}
          {colorsWithGradeCategoryWcag2.map(
            ({ color: spotColor, gradeCategory }) => (
              <div
                key={spotColor.toString()}
                className={classes.spotWrapper + " " + classes.spotWrapperWcag2}
                /* @ts-expect-error React doesn't recognize custom property names as style properties */
                style={{ "--okl": spotColor.to("oklch").l }}
              >
                <div className={classes.spot}>
                  <div className={classes.spotTip}>
                    WCAG2 {gradeCategory.valueOf()} (
                    {Grade.toMinContrastWcag2(gradeCategory)})
                    <br />
                    {spotColor
                      .to("srgb")
                      .toString({ collapse: false, format: "hex" })}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

function _getYByMinGradeCategoryWithDirectionApca({
  direction,
  edgeContrasts,
  initY,
}: {
  direction: "toBlack" | "toWhite";
  edgeContrasts: {
    blackApca: Grade;
    whiteApca: Grade;
  };
  initY: number;
}): Map<GradeCategory, number> {
  const yByGradeCategory: Map<GradeCategory, number> = new Map();

  const edgeContrast =
    direction === "toBlack" ? edgeContrasts.blackApca : edgeContrasts.whiteApca;

  if (edgeContrast.value === Grade.fail) {
    return yByGradeCategory;
  }

  const fail = new Grade(Grade.fail);

  for (const gradeCategoryToGet of [
    Grade.fail,
    Grade.graphics,
    Grade.largeText,
    Grade.normalText,
  ]) {
    const gradeToGet = new Grade(gradeCategoryToGet);

    if (gradeToGet > edgeContrast || gradeToGet <= fail) {
      continue;
    }

    const targetContrast = Grade.toMinContrastApca(gradeToGet);

    const yToGet = guessYForContrastAndDirectionApca({
      direction,
      initY,
      targetMinContrast: targetContrast,
    });

    yByGradeCategory.set(gradeCategoryToGet, yToGet);
  }

  return yByGradeCategory;
}

function _getYByMinGradeCategoryWithDirectionWcag2({
  direction,
  edgeContrasts,
  initY,
}: {
  direction: "toBlack" | "toWhite";
  edgeContrasts: {
    blackWcag2: Grade;
    whiteWcag2: Grade;
  };
  initY: number;
}): Map<GradeCategory, number> {
  const yByGradeCategory: Map<GradeCategory, number> = new Map();

  const edgeContrast =
    direction === "toBlack"
      ? edgeContrasts.blackWcag2
      : edgeContrasts.whiteWcag2;

  if (edgeContrast.value === Grade.fail) {
    return yByGradeCategory;
  }

  const fail = new Grade(Grade.fail);

  for (const gradeCategoryToGet of [
    Grade.fail,
    Grade.graphics,
    Grade.largeText,
    Grade.normalText,
  ]) {
    const gradeToGet = new Grade(gradeCategoryToGet);

    if (gradeToGet > edgeContrast || gradeToGet <= fail) {
      continue;
    }

    const targetContrast = Grade.toMinContrastWcag2(gradeToGet);

    const yToGet = guessYForContrastAndDirectionWcag2({
      direction,
      initY,
      targetMinContrast: targetContrast,
    });

    yByGradeCategory.set(gradeCategoryToGet, yToGet);
  }

  return yByGradeCategory;
}
