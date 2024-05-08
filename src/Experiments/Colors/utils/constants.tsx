/**
 * APCA   0.0.98G - 4g - W3 Compatible Constants
 */
export const APCA_CONSTANTS_98G = {
  mainTRC: 2.4, // 2.4 exponent for emulating actual monitor perception

  // For reverseAPCA
  get mainTRCencode() {
    return 1 / this.mainTRC;
  },

  // sRGB coefficients
  sRco: 0.2126729,
  sGco: 0.7151522,
  sBco: 0.072175,

  // G-4g constants for use with 2.4 exponent
  normBG: 0.56,
  normTXT: 0.57,
  revTXT: 0.62,
  revBG: 0.65,

  // G-4g Clamps and Scalers
  blkThrs: 0.022,
  blkClmp: 1.414,
  scaleBoW: 1.14,
  scaleWoB: 1.14,
  loBoWoffset: 0.027,
  loWoBoffset: 0.027,
  deltaYmin: 0.0005,
  loClip: 0.1,

  ///// MAGIC NUMBERS for UNCLAMP, for use with 0.022 & 1.414 /////
  // Magic Numbers for reverseAPCA
  mFactor: 1.9468554433171,
  get mFactInv() {
    return 1 / this.mFactor;
  },
  mOffsetIn: 0.0387393816571401,
  mExpAdj: 0.283343396420869,
  get mExp() {
    return this.mExpAdj / this.blkClmp;
  },
  mOffsetOut: 0.312865795870758,
} as const;

/**
 * WCAG 2.1 requires a contrast ratio of at least 3:1 for graphics and
 * user interface components (such as form input borders). WCAG Level
 * AAA requires a contrast ratio of at least 7:1 for normal text and
 * 4.5:1 for large text. Large text is defined as 14 point (typically
 * 18.66px) and bold or larger, or 18 point (typically 24px) or larger.
 */
const _gradeWCAG2: Array<[number, string]> = [
  [3, "graphics"],
  [4.5, "large-text"],
  [7, "normal-text"],
];

export const gradeWCAG2 = _gradeWCAG2.sort(
  ([contrastA], [contrastB]) => contrastB - contrastA
);
