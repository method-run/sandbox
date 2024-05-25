import { Scale } from "./Scale/Scale";

export const Colors = () => {
  return (
    <div>
      <h2>Colors</h2>
      <section>
        <h3>Color generation by contrast</h3>
        <p>
          When you change the input color, the gradient updates in OKLCH color
          space. OKLCH is intended to be perceptually uniform, so just by using
          your browser's in color picker, switching to HSL, and messing with the
          H slider, you can see how different perceived brightness is between
          various hues.
        </p>
        <p>
          Even more interestingly, we're finding the closest colors sharing an
          OKLCH chroma and hue that meet certain (somewhat arbitrary) contrast
          thresholds. You can see the nearest neigbor colors that hit three
          contrast thresholds using both contrast algorithms from APCA (a
          candidate for WCAG3) and WCAG2 (the current accessibility standard).
        </p>
        <p>
          Oh, APCA. I think its model is strictly better in terms of predicting
          legibility of text.
          <br />
          On the other hand, I find the granularity of its lookup table pretty
          onerous, and it sets the bar noticeably higher in a way that I suspect
          will hinder adoption.
        </p>
        <Scale />
        <br />
        <br />
      </section>
    </div>
  );
};
