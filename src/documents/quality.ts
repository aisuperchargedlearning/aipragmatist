/** Upload limits and quality rules. In the real build these checks run on the server. */
export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
export const MAX_LONG_EDGE = 2000;
export const JPEG_QUALITY = 0.8;
export const MIN_LONG_EDGE = 800;
export const MIN_SHORT_EDGE = 500;
export const MAX_PAGES = 10;
/** Size of the sample drawn to check whether a photo is blank. */
export const BLANK_SAMPLE_SIZE = 64;
/** Brightness spread (0 to 255) below which a photo counts as blank. */
export const BLANK_STDDEV_THRESHOLD = 5;
/** Minimum time to show "Checking your document…" so the step feels deliberate. */
export const MIN_CHECKING_MS = 1000;

export type RejectionReason = 'unreadable' | 'too_small' | 'wrong_type';

export function meetsMinimumResolution(width: number, height: number): boolean {
  const long = Math.max(width, height);
  const short = Math.min(width, height);
  return long >= MIN_LONG_EDGE && short >= MIN_SHORT_EDGE;
}

/** Scales down (never up) so the long edge is at most maxLongEdge. */
export function fitWithin(width: number, height: number, maxLongEdge = MAX_LONG_EDGE) {
  const long = Math.max(width, height);
  if (long <= maxLongEdge) return { width, height };
  const scale = maxLongEdge / long;
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

/**
 * True when an image is essentially one flat color (a blank page, a covered lens,
 * a photo taken in the dark). Takes RGBA pixel data.
 */
export function isBlank(rgba: Uint8ClampedArray, threshold = BLANK_STDDEV_THRESHOLD): boolean {
  const pixels = Math.floor(rgba.length / 4);
  if (pixels === 0) return true;
  let sum = 0;
  let sumSq = 0;
  for (let i = 0; i < pixels; i++) {
    const o = i * 4;
    const lum = 0.2126 * (rgba[o] ?? 0) + 0.7152 * (rgba[o + 1] ?? 0) + 0.0722 * (rgba[o + 2] ?? 0);
    sum += lum;
    sumSq += lum * lum;
  }
  const mean = sum / pixels;
  const variance = Math.max(0, sumSq / pixels - mean * mean);
  return Math.sqrt(variance) < threshold;
}
