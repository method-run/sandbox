import { useCallback, useState } from "react";
import { Scale } from "./Scale/Scale";
import { useContrasts } from "./utils/useContrasts";
import { COLOR } from "./utils/COLOR";

export const Colors = () => {
  const [colorTxt, setColorTxt] = useState(
    COLOR.eigengrau.toString({ collapse: false, format: "hex" })
  );

  const handleChangeTxt = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setColorTxt(e.target.value);
    },
    []
  );

  const [colorBg, setColorBg] = useState(
    COLOR.white.toString({ collapse: false, format: "hex" })
  );

  const handleChangeBg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setColorBg(e.target.value);
    },
    []
  );

  const handleClickFlip = useCallback(() => {
    const nextColorTxt = colorBg;
    const nextColorBg = colorTxt;
    setColorTxt(nextColorTxt);
    setColorBg(nextColorBg);
  }, [colorBg, colorTxt]);

  const {
    bgYApca,
    txtYApca,
    contrastApca,
    contrastWcag2,
    gradeApca,
    gradeWcag2,
    bgYWcag2,
    txtYWcag2,
  } = useContrasts(colorTxt, colorBg);

  return (
    <div>
      <h2>Colors</h2>
      <p>colors demos</p>
      <br />
      <section>
        <h3>Color luminance and contrast measurement</h3>
        <label htmlFor="text">Text color</label>
        <input
          name="text"
          type="color"
          value={colorTxt}
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
          value={colorBg}
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
          <dt>APCA Grade</dt>
          <dd>{gradeApca.value}</dd>
          <dt>WCAG2 Contrast</dt>
          <dd>{contrastWcag2}</dd>
          <dt>WCAG2 Grade</dt>
          <dd>{gradeWcag2.value}</dd>
        </dl>
      </section>
      <section>
        <h3>Color generation by contrast</h3>
        <Scale />
      </section>
    </div>
  );
};
