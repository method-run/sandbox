import { APCA_CONSTANTS_98G } from "./constants";

/**
 * Take luminances for txt and bg, return contrast. Contrast may be negative.
 * txtY and bgY must be between 0.0-1.0
 * IMPORTANT: Do not swap, polarity is important.
 */
export function getApcaContrast(txtY: number, bgY: number, places = -1) {
  const icp = [0.0, 1.1]; // input range clamp / input error check

  if (
    isNaN(txtY) ||
    isNaN(bgY) ||
    Math.min(txtY, bgY) < icp[0] ||
    Math.max(txtY, bgY) > icp[1]
  ) {
    throw new Error(
      "Invalid input. Luminances must be numbers between 0 and 1.1"
    );
  }

  let SAPC = 0.0; // For raw SAPC values
  let outputContrast = 0.0; // For weighted final values
  let polCat = "BoW"; // Alternate Polarity Indicator. N normal R reverse

  // Soft clamps Y for either color if it is near black.
  txtY =
    txtY > APCA_CONSTANTS_98G.blkThrs
      ? txtY
      : txtY +
        Math.pow(APCA_CONSTANTS_98G.blkThrs - txtY, APCA_CONSTANTS_98G.blkClmp);
  bgY =
    bgY > APCA_CONSTANTS_98G.blkThrs
      ? bgY
      : bgY +
        Math.pow(APCA_CONSTANTS_98G.blkThrs - bgY, APCA_CONSTANTS_98G.blkClmp);

  ///// Return 0 Early for extremely low ∆Y
  if (Math.abs(bgY - txtY) < APCA_CONSTANTS_98G.deltaYmin) {
    return 0.0;
  }

  //////////   APCA/SAPC CONTRAST - LOW CLIP (W3 LICENSE)  ///////////////

  if (bgY > txtY) {
    // For normal polarity, black text on white (BoW)

    // Calculate the SAPC contrast value and scale
    SAPC =
      (Math.pow(bgY, APCA_CONSTANTS_98G.normBG) -
        Math.pow(txtY, APCA_CONSTANTS_98G.normTXT)) *
      APCA_CONSTANTS_98G.scaleBoW;

    // Low Contrast smooth rollout to prevent polarity reversal
    // and also a low-clip for very low contrasts
    outputContrast =
      SAPC < APCA_CONSTANTS_98G.loClip
        ? 0.0
        : SAPC - APCA_CONSTANTS_98G.loBoWoffset;
  } else {
    // For reverse polarity, light text on dark (WoB)
    // WoB should always return negative value.
    polCat = "WoB";

    SAPC =
      (Math.pow(bgY, APCA_CONSTANTS_98G.revBG) -
        Math.pow(txtY, APCA_CONSTANTS_98G.revTXT)) *
      APCA_CONSTANTS_98G.scaleWoB;

    outputContrast =
      SAPC > -APCA_CONSTANTS_98G.loClip
        ? 0.0
        : SAPC + APCA_CONSTANTS_98G.loWoBoffset;
  }

  // return Lc (lightness contrast) as a signed numeric value
  // Round to the nearest whole number as string is optional.
  // Rounded can be a signed INT as output will be within ± 127
  // places = -1 returns signed float, 1 or more set that many places
  // 0 returns rounded string, uses BoW or WoB instead of minus sign

  if (places < 0) {
    // Default (-1) number out, all others are strings
    return outputContrast * 100.0;
  } else if (places == 0) {
    return (
      Math.round(Math.abs(outputContrast) * 100.0) + "<sub>" + polCat + "</sub>"
    );
  } else if (Number.isInteger(places)) {
    return (outputContrast * 100.0).toFixed(places);
  } else {
    return 0.0;
  }
} // End APCAcontrast()
