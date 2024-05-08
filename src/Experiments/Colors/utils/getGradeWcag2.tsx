/*
    WCAG 2.1 requires a contrast ratio of at least 3:1 for graphics and
    user interface components (such as form input borders).
    WCAG Level AAA requires a contrast ratio of at least 7:1 for normal
    text and 4.5:1 for large text.
    Large text is defined as 14 point (typically 18.66px) and bold or larger,
    or 18 point (typically 24px) or larger.
*/

import { gradeWCAG2 } from "./constants";

export const getGradeWcag2 = (contrast: number) => {
  const contrastAbs = Math.abs(contrast);
  const grade = gradeWCAG2.find(([minContrast]) => contrastAbs >= minContrast);
  return grade?.[1] ?? "fail";
};
