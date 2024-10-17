import { css, cx } from "@emotion/css";
import { useCallback, useLayoutEffect, useState } from "react";
import { Word } from "../Word";

export const Akureyri = () => {
  const bodyCss = css({
    height: "100dvh",
    width: "100dvw",
    overflow: "hidden",
    fontSize: "calc(100vw / 9)",
  });

  const gridCss = css(`
        position: absolute;
        inset: 0;
        height: 100dvh;
        width: 100dvw;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 2fr 1fr 1fr 0.25fr 2fr;
        background: white;

        grid-template-areas:
            "sky"
            "snow"
            "hills"
            "rocks"
            "sea";

        animation-duration: 15s;
        animation-iteration-count: infinite;
        animation-name: rock;

        @keyframes rock {
          0% {
            transform: rotate(-0.5deg);
          }

          50% {
            transform: rotate(0.5deg);
          }

          100% {
            transform: rotate(-0.5deg);
          }
        }
    `);

  useLayoutEffect(() => {
    document.body.classList.add(bodyCss);
    document.documentElement.classList.add(bodyCss);

    return () => {
      document.body.classList.remove(bodyCss);
      document.documentElement.classList.remove(bodyCss);
    };
  }, [bodyCss]);

  const [skyStyle, setSkyStyle] = useState<string>(
    "background: linear-gradient(0, oklch(0.99 0.01 243.25) 0%, white 10%, oklch(0.96 0.02 243.25) 100%)"
  );

  const [snowStyle, setSnowStyle] = useState<string>(`
    position: relative;

    background:
      linear-gradient(180deg, white 8%, #2a1c0e30 10%, white 12%, #2a1c0e30 20%, white 37%, #2a1c0e9a 42%, #ffffff70 52%, #2a1c0eca 69%, #2a1c0eca 75%, #927d61 100%),
      linear-gradient(98deg, oklch(1 0 0 / 0.15) 0%, oklch(0.96 0.02 243.25 / 0.01) 100%);

    background-blend-mode: screen, normal;
  `);

  const [hillsStyle, setHillsStyle] = useState<string>(`
    background:
      linear-gradient(180deg, #a18161 8%, #927f73 10%, #94987a 12%, #9fa97f 20%, #82887a 37%, #444e30 42%, #b9b18b 44%, #633927ca 69%, #6b816c 75%, #313724 88%, #bdb289 92%, #bdb289 100%)
  `);

  const [rocksStyle, setRocksStyle] = useState<string>(`
    background:
      linear-gradient(180deg, #e0d2be, #a1998d, #a1998d 20%, #3F3D38 25%, #1f1e1b, #1f1e1b 88%, #6f8491);
  `);

  const [seaStyle, setSeaStyle] = useState<string>(`
    background:
      linear-gradient(180deg, #638f9a, #d2dadd 7%, #ffffff 25%, #99bfcc);
    `);

  const formCss = css({ mixBlendMode: "difference" });
  const skyCss = css(skyStyle);
  const snowCss = css(snowStyle);
  const hillsCss = css(hillsStyle);
  const rocksCss = css(rocksStyle);
  const seaCss = css(seaStyle);

  const [isDebugVisible, setIsDebugVisible] = useState(false);

  const handleBodyKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "." && e.target === document.body) {
      setIsDebugVisible((prev) => !prev);
    }
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("keyup", handleBodyKeyUp);

    return () => {
      window.removeEventListener("keyup", handleBodyKeyUp);
    };
  }, [handleBodyKeyUp]);

  const gridCssOverlay = css(`
    transform: rotate(45deg) scale(3);
    mix-blend-mode: plus-lighter;
    opacity: 0.1;

    animation-duration: 15s;
    animation-iteration-count: infinite;
    animation-name: roll;

    @keyframes roll {
      0% {
        transform: rotate(1deg) scale(3);
      }

      50% {
        transform: rotate(-1deg) scale(3);
      }

      100% {
        transform: rotate(1deg) scale(3);
      }
    }
  `);

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
      <div className={gridCss}>
        <div className={skyCss}></div>
        <div className={snowCss}></div>
        <div className={hillsCss}></div>
        <div className={rocksCss}></div>
        <div className={seaCss}></div>
      </div>
      <div className={cx(gridCss, gridCssOverlay)}>
        <div className={skyCss}></div>
        <div className={snowCss}></div>
        <div className={hillsCss}></div>
        <div className={rocksCss}></div>
        <div className={seaCss}></div>
      </div>
      <h1 className={headingCss}>
        <Word value="akureyri" />
      </h1>
      <form
        className={formCss}
        style={{ visibility: isDebugVisible ? "visible" : "hidden" }}
      >
        <label>Sky</label>
        <textarea
          value={skyStyle}
          onChange={({ target: { value } }) => setSkyStyle(value)}
        />
        <label>Snow</label>
        <textarea
          value={snowStyle}
          onChange={({ target: { value } }) => setSnowStyle(value)}
        />
        <label>Hills</label>
        <textarea
          value={hillsStyle}
          onChange={({ target: { value } }) => setHillsStyle(value)}
        />
        <label>Rocks</label>
        <textarea
          value={rocksStyle}
          onChange={({ target: { value } }) => setRocksStyle(value)}
        />
        <label>Water</label>
        <textarea
          value={seaStyle}
          onChange={({ target: { value } }) => setSeaStyle(value)}
        />
      </form>
    </>
  );
};
