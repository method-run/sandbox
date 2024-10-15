import { css, cx } from "@emotion/css";
import { useMemo } from "react";

const BACKGROUND = "black";
const FOREGROUND = "white";
const BLEND_MODE = "plus-lighter";
const ROUNDNESS = 1;
const CUTOUT_SIZE = 1;

const SUPPORTED_LETTERS = [
  "a",
  "e",
  "g",
  "i",
  "k",
  "n",
  "r",
  "u",
  "y",
] as const;

export type LetterProps = {
  value: string;
  background?: string;
  foreground?: string;
  blendMode?: string;
  roundness?: number;
  cutoutSize?: number;
};

export const Letter = ({
  value,
  background = BACKGROUND,
  foreground = FOREGROUND,
  blendMode = BLEND_MODE,
  roundness = ROUNDNESS,
  cutoutSize = CUTOUT_SIZE,
}: LetterProps) => {
  const letterCss = css(`
    height: 2ex;
    width: 1em;
    background: ${foreground};
    display: inline-block;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    mix-blend-mode: ${blendMode};
    opacity: 20%;
    margin: 0 0.025em;
    color: transparent;

    &::before,
    &::after {
      border-radius: calc(0.1em * ${cutoutSize} * ${roundness});
      height: calc(0.2em * ${cutoutSize});
      width: calc(0.2em * ${cutoutSize});
    }
  `);

  const cssByLetter = useMemo<
    Record<(typeof SUPPORTED_LETTERS)[number], string>
  >(
    () =>
      ({
        a: css(`
          &::before {
            content: "A";
            position: absolute;
            top: calc(2ex / 3);
            margin-top: calc(-0.1em * ${cutoutSize});
            left: 50%;
            margin-left: calc(-0.1em * ${cutoutSize});
            background: ${background};
            box-shadow:
              0 calc(4ex / 3) 0 ${background};
          }
        `),
        e: css(`
          &::before {
            content: "E";
            position: absolute;
            top: calc(2ex / 4);
            margin-top: calc(-0.1em * ${cutoutSize});
            right: 0;
            margin-right: calc(-0.1em * ${cutoutSize});
            background: ${background};
            box-shadow:
              0 calc(4ex / 4) 0 ${background};
          }
        `),
        g: css(`
          &::before {
            content: "G";
            position: absolute;
            top: calc(2ex / 3);
            margin-top: calc(-0.1em * ${cutoutSize});
            right: 0;
            margin-right: calc(-0.1em * ${cutoutSize});
            background: ${background};
            box-shadow:
              calc(-1em / 3) calc(4ex / 3) 0 ${background};
          }
        `),
        i: css(`
          width: calc(2 * 1em / 3);

          &::before {
            content: "I";
          }
        `),
        k: css(`
          &::before {
            content: "K";
            position: absolute;
            top: 50%;
            margin-top: calc(-0.1em * ${cutoutSize});
            right: 0;
            margin-right: calc(-0.1em * ${cutoutSize});
            background: ${background};
            box-shadow:
              -0.45em -1ex 0 ${background},
              -0.45em 1ex 0 ${background};
          }
        `),
        n: css(`
          &::before {
            content: "N";
            position: absolute;
            top: 0;
            margin-top: calc(-0.1em * ${cutoutSize});
            right: calc(1em / 3);
            margin-right: calc(-0.1em * ${cutoutSize});
            background: ${background};
            box-shadow:
              calc(-1em / 3) calc(2ex) 0 ${background};
          }
        `),
        r: css(`
          &::before {
            content: "R";
            position: absolute;
            top: 50%;
            margin-top: calc(-0.1em * ${cutoutSize});
            right: 0;
            margin-right: calc(-0.1em * ${cutoutSize});
            background: ${background};
            box-shadow:
              -0.5em calc(-1ex / 3) 0 ${background},
              -0.5em 1ex 0 ${background};
          }
        `),
        u: css(`
          &::before {
            content: "U";
            position: absolute;
            top: 0;
            margin-top: calc(-0.1em * ${cutoutSize});
            left: 50%;
            margin-left: calc(-0.1em * ${cutoutSize});
            background: ${background};
          }
        `),
        y: css(`
          &::before {
            content: "Y";
            position: absolute;
            top: 0;
            margin-top: calc(-0.1em * ${cutoutSize});
            left: 50%;
            margin-left: calc(-0.1em * ${cutoutSize});
            background: ${background};
            box-shadow:
              -0.5em calc(4ex / 3) 0 ${background};
          }
        `),
      } as const),
    [background, cutoutSize]
  );

  if (!_isSupportedLetter(value)) {
    throw new Error(`letter not implemented: ${value}`);
  }

  return <span className={cx(letterCss, cssByLetter[value])}>{value}</span>;
};

function _isSupportedLetter(
  x: string
): x is (typeof SUPPORTED_LETTERS)[number] {
  return SUPPORTED_LETTERS.includes(x as (typeof SUPPORTED_LETTERS)[number]);
}
