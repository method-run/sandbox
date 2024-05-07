import Color from "colorjs.io";
import { useCallback, useMemo, useState } from "react";
import { getApcaContrast, getLuminanceFromRgb } from "./utils";

const COLOR_EIGENGRAU = "#16161D";

export const Colors = () => {
  const [colorText, setColorText] = useState(COLOR_EIGENGRAU);
  const [luminanceText, setLuminanceText] = useState(0);
  const [colorBackground, setColorBackground] = useState(COLOR_EIGENGRAU);
  const [luminanceBackground, setLuminanceBackground] = useState(0);

  const handleChangeColor = useCallback(
    (textOrBackground: "text" | "background") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const setColor =
          textOrBackground === "text" ? setColorText : setColorBackground;

        const setLuminance =
          textOrBackground === "text"
            ? setLuminanceText
            : setLuminanceBackground;

        const color = new Color(e.target.value);
        const rgb = color.to("srgb");
        setColor(e.target.value);

        setLuminance(
          getLuminanceFromRgb([rgb.r * 255, rgb.g * 255, rgb.b * 255])
        );
      },
    []
  );

  const apcaContrast = useMemo(
    () => getApcaContrast(luminanceText, luminanceBackground),
    [luminanceBackground, luminanceText]
  );

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
        onChange={handleChangeColor("text")}
      />
      <dl>
        <dt>Luminance</dt>
        <dd>{luminanceText}</dd>
      </dl>
      <br />
      <label htmlFor="background">Background color</label>
      <input
        name="background"
        type="color"
        value={colorBackground}
        onChange={handleChangeColor("background")}
      />
      <dl>
        <dt>Luminance</dt>
        <dd>{luminanceBackground}</dd>
      </dl>
      <br />
      <dl>
        <dt>Contrast</dt>
        <dd>{apcaContrast}</dd>
      </dl>
    </div>
  );
};
