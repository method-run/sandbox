import Color from "colorjs.io";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getContrastApca, getLuminanceApca } from "./utils";
import { getLuminanceWcag2 } from "./utils/getLuminanceWcag2";
import { getContrastWcag2 } from "./utils/getContrastWcag2";
import { getGradeWcag2 } from "./utils/getGradeWcag2";

const COLOR_EIGENGRAU = "#16161D";

export const Colors = () => {
  const [colorText, setColorText] = useState(COLOR_EIGENGRAU);
  const [colorBackground, setColorBackground] = useState(COLOR_EIGENGRAU);
  // APCA
  const [txtYApca, setTxtYApca] = useState(0);
  const [bgYApca, setBgYApca] = useState(0);
  const [contrastApca, setContrastApca] = useState(0);

  // WCAG2
  const [txtYWcag2, setTxtYWcag2] = useState(0);
  const [bgYWcag2, setBgYWcag2] = useState(0);
  const [contrastWcag2, setContrastWcag2] = useState(0);

  const handleChangeTxt = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setColorText(e.target.value);
    },
    []
  );

  const handleChangeBg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setColorBackground(e.target.value);
    },
    []
  );

  useEffect(() => {
    const color = new Color(colorText);
    const rgb = color.to("srgb");
    setTxtYApca(getLuminanceApca([rgb.r * 255, rgb.g * 255, rgb.b * 255]));
    setTxtYWcag2(getLuminanceWcag2([rgb.r * 255, rgb.g * 255, rgb.b * 255]));
  }, [colorText]);

  useEffect(() => {
    const color = new Color(colorBackground);
    const rgb = color.to("srgb");
    setBgYApca(getLuminanceApca([rgb.r * 255, rgb.g * 255, rgb.b * 255]));
    setBgYWcag2(getLuminanceWcag2([rgb.r * 255, rgb.g * 255, rgb.b * 255]));
  }, [colorBackground]);

  useEffect(() => {
    setContrastApca(
      getContrastApca({
        txtY: txtYApca,
        bgY: bgYApca,
      })
    );
  }, [bgYApca, txtYApca]);

  useEffect(() => {
    setContrastWcag2(
      getContrastWcag2({
        txtY: txtYWcag2,
        bgY: bgYWcag2,
      })
    );
  }, [bgYWcag2, txtYWcag2]);

  const gradeWcag2 = useMemo(
    () => getGradeWcag2(contrastWcag2),
    [contrastWcag2]
  );

  const handleClickFlip = useCallback(() => {
    const nextColorText = colorBackground;
    const nextColorBackground = colorText;
    setColorText(nextColorText);
    setColorBackground(nextColorBackground);
  }, [colorBackground, colorText]);

  return (
    <div>
      <h2>Colors</h2>
      <p>colors demos</p>
      <br />
      <label htmlFor="text">Text color</label>
      <input
        name="text"
        type="color"
        value={colorText}
        onChange={handleChangeTxt}
      />
      <dl>
        <dt>Luminance</dt>
        <dd>{txtYApca}</dd>
        <dt>WCAG2 Luminance</dt>
        <dd>{txtYWcag2}</dd>
      </dl>
      <br />
      <label htmlFor="background">Background color</label>
      <input
        name="background"
        type="color"
        value={colorBackground}
        onChange={handleChangeBg}
      />
      <dl>
        <dt>APCA Luminance</dt>
        <dd>{bgYApca}</dd>
        <dt>WCAG2 Luminance</dt>
        <dd>{bgYWcag2}</dd>
      </dl>
      <br />
      <button onClick={handleClickFlip}>Flip</button>
      <br />
      <dl>
        <dt>APCA Contrast</dt>
        <dd>{contrastApca}</dd>
        <dt>WCAG2 Contrast</dt>
        <dd>{contrastWcag2}</dd>
        <dt>WCAG2 Grade</dt>
        <dd>{gradeWcag2}</dd>
      </dl>
    </div>
  );
};
