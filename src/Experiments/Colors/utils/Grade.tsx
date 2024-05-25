/**
 * WCAG 2.1 requires a contrast ratio of at least 3:1 for graphics and
 * user interface components (such as form input borders). WCAG Level
 * AAA requires a contrast ratio of at least 7:1 for normal text and
 * 4.5:1 for large text. Large text is defined as 14 point (typically
 * 18.66px) and bold or larger, or 18 point (typically 24px) or larger.
 *
 * APCA approximations of WCAG2's contrast recommendations are based on
 * the lightest grayscale hex color that passed AAA recommended contrast
 * on a white background.
 */
export type GradeCategory = "fail" | "graphics" | "large-text" | "normal-text";

type GradeConstructorOptions =
  | { apca?: undefined | false; wcag2: true }
  | { apca: true; wcag2?: undefined | false };

type GradeConstructorArgs =
  | [grade: GradeCategory]
  | [contrast: number, options?: GradeConstructorOptions];

export class Grade {
  private _grade: GradeCategory;

  constructor(...args: GradeConstructorArgs) {
    const [contrastOrGrade, options] = args;

    if (typeof contrastOrGrade === "number") {
      if (!options) {
        throw new Error(
          "options must includes `apca: true` or `wcag2: true` when constructing a grade from a constrast ratio"
        );
      }

      this._grade = options.apca
        ? Grade.fromContrastApca(contrastOrGrade)
        : Grade.fromContrastWcag2(contrastOrGrade);
    } else {
      this._grade = contrastOrGrade;
    }
  }

  public set value(grade: GradeCategory) {
    this._grade = grade;
  }

  public get value(): GradeCategory {
    return this._grade;
  }

  public toString = () => this._grade;

  /** Contrast ratios that aren't really supposed to be used for anything */
  public static fail = "fail" as GradeCategory;

  /**
   * For graphics and user interface components such as form input borders.
   * APCA Rank 3 with 24px, 400 weight text is roughly equivalent to
   * WCAG2's graphics recommendation.
   */
  public static graphics = "graphics" as GradeCategory;

  /**
   * Large text is defined as 18.66px or 20px and larger, variously.
   * APCA Rank 3 with 18px, 400 weight text is roughly equivalent to
   * WCAG2's large text recommendation.
   */
  public static largeText = "large-text" as GradeCategory;

  /**
   * Large text is defined as smaller than 18.66px or 20px, variously.
   * APCA Rank 1 with 14px, 400 weight text is roughly equivalent to
   * WCAG2's normal text recommendation.
   */
  public static normalText = "normal-text" as GradeCategory;

  public static orderedGrades = [
    Grade.fail,
    Grade.graphics,
    Grade.largeText,
    Grade.normalText,
  ];

  public static compareGradeCategories = (
    a: GradeCategory,
    b: GradeCategory
  ) => {
    return Grade.orderedGrades.indexOf(a) - Grade.orderedGrades.indexOf(b);
  };

  public static compare = (a: Grade, b: Grade) => {
    return (
      Grade.orderedGrades.indexOf(a.value) -
      Grade.orderedGrades.indexOf(b.value)
    );
  };

  public static breakpointsApca: Array<[number, GradeCategory]> = [
    [0, Grade.fail],
    [45, Grade.graphics],
    [75, Grade.largeText],
    [90, Grade.normalText],
  ] as const;

  public static breakpointsWcag2 = [
    [1, Grade.fail],
    [3, Grade.graphics],
    [4.5, Grade.largeText],
    [7, Grade.normalText],
  ] as const;

  private static _toContrast = ({
    maxOrMin,
    gradeOrGradeCategory,
    standard,
  }: {
    maxOrMin: "max" | "min";
    gradeOrGradeCategory: Grade | GradeCategory;
    standard: "APCA" | "WCAG2";
  }): number => {
    const gradeCategory =
      gradeOrGradeCategory instanceof Grade
        ? gradeOrGradeCategory.value
        : gradeOrGradeCategory;

    const breakpoints =
      standard === "APCA" ? Grade.breakpointsApca : Grade.breakpointsWcag2;

    let breakpointIndex = breakpoints.findIndex(
      ([, _gradeCategory]) => gradeCategory === _gradeCategory
    );

    if (breakpointIndex < 0) {
      throw new Error("Invalid grade");
    }

    if (maxOrMin === "max") {
      breakpointIndex++;
    }

    if (breakpointIndex > breakpoints.length - 1) {
      throw new Error("Grade out of bounds");
    }

    return breakpoints[breakpointIndex][0];
  };

  public static toMinContrastApca = (
    gradeOrGradeCategory: Grade | GradeCategory
  ): number => {
    return Grade._toContrast({
      maxOrMin: "min",
      gradeOrGradeCategory,
      standard: "APCA",
    });
  };

  public static toMinContrastWcag2 = (
    gradeOrGradeCategory: Grade | GradeCategory
  ): number => {
    return Grade._toContrast({
      maxOrMin: "min",
      gradeOrGradeCategory,
      standard: "WCAG2",
    });
  };

  public static fromContrastApca = (contrast: number): GradeCategory => {
    const contrastAbs = Math.abs(contrast);

    for (let i = Grade.breakpointsApca.length - 1; i >= 0; i--) {
      const [minContrast, grade] = Grade.breakpointsApca[i];

      if (contrastAbs >= minContrast) {
        return grade;
      }
    }

    return Grade.fail;
  };

  public static fromContrastWcag2 = (contrast: number): GradeCategory => {
    const contrastAbs = Math.abs(contrast);

    for (let i = Grade.breakpointsWcag2.length - 1; i >= 0; i--) {
      const [minContrast, grade] = Grade.breakpointsWcag2[i];

      if (contrastAbs >= minContrast) {
        return grade;
      }
    }

    return Grade.fail;
  };
}
