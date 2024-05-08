import { gradeAPCA } from "./constants";

/*
    Based on my own testing, in grayscale hex colors, get some quasi-semantic
    grades representing the smallest font size and weight visible with a
    reasonable APCA contrast value.
*/
export const getGradeApca = (contrast: number) => {
  const contrastAbs = Math.abs(contrast);
  const grade = gradeAPCA.find(([minContrast]) => contrastAbs >= minContrast);
  return grade?.[1] ?? "fail";
};
