import { css, cx } from "@emotion/css";
import { useLayoutEffect } from "react";
import { Word } from "../Word";

export const Geiranger = () => {
  const bodyCss = css({
    fontSize: "calc(100vw / 10)",
  });

  const gridCss = css(`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
  `);

  const landscapeGradientCss = css(`
    background:
      white
      linear-gradient(
        180deg,
        oklch(0.76 0.13 254.95),
        oklch(0.84 0.09 255.34) 20%,
        oklch(0.95 0.03 255.23) 20%,
        oklch(0.98 0.03 93.27),
        oklch(0.9 0.05 263.19) 30%,
        oklch(0.35 0.01 0) 31%,
        oklch(0.41 0.02 0.36) 31%,
        oklch(0.84 0.11 74.6) 35%,
        oklch(0.69 0.11 119.77) 45%,
        oklch(0.63 0.12 132.35) 50%,
        oklch(0.49 0.07 143.12),
        oklch(0.42 0.03 133.39) 75%,
        oklch(0.43 0.02 27.99),
        oklch(0.56 0.01 0.2),
        oklch(0.59 0 0) 80%,
        oklch(1 0 0) 81%,
        oklch(0.49 0.07 143.12) 82%,
        oklch(0.49 0.07 143.12) 85%,
        oklch(0.37 0.05 143.12) 86%,
        oklch(0.28 0.01 143.2),
        oklch(0.42 0.04 127.29),
        oklch(0.53 0.09 108.14)
      );
  `);

  useLayoutEffect(() => {
    document.body.classList.add(bodyCss);
    return () => document.body.classList.remove(bodyCss);
  }, [bodyCss]);

  const headingCss = css(`
    margin: 0;
    top: 50%;
    font-size: 1em;
    margin-top: -0.5em;
    position: absolute;
    padding: 0;
    left: 0;
    width: 100%;
    text-align: center;
  `);

  return (
    <>
      <div className={cx(gridCss, landscapeGradientCss)} />
      <h1 className={headingCss}>
        <Word value="geiranger" />
      </h1>
    </>
  );
};
