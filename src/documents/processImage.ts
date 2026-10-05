import {
  BLANK_SAMPLE_SIZE,
  JPEG_QUALITY,
  fitWithin,
  isBlank,
  meetsMinimumResolution,
  type RejectionReason,
} from './quality';

export type ImageResult =
  | { ok: true; blob: Blob; width: number; height: number }
  | { ok: false; reason: RejectionReason };

type Decoded = { source: CanvasImageSource; width: number; height: number; close: () => void };

/** Decodes an image and applies its orientation, so sideways phone photos come out upright. */
async function decode(blob: Blob): Promise<Decoded | null> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(blob, { imageOrientation: 'from-image' } as ImageBitmapOptions);
      return { source: bitmap, width: bitmap.width, height: bitmap.height, close: () => bitmap.close() };
    } catch {
      // Fall back to an <img> element below.
    }
  }
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    return { source: img, width: img.naturalWidth, height: img.naturalHeight, close: () => {} };
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function convertHeic(blob: Blob): Promise<Blob | null> {
  try {
    const { default: heic2any } = await import('heic2any');
    const out = await heic2any({ blob, toType: 'image/jpeg', quality: 0.92 });
    return Array.isArray(out) ? (out[0] ?? null) : out;
  } catch {
    return null;
  }
}

function draw(image: Decoded, width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available');
  // White background so transparent PNGs do not turn black as JPEG.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(image.source, 0, 0, width, height);
  return canvas;
}

function toJpeg(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/jpeg', JPEG_QUALITY));
}

/**
 * Prototype stand-in for server-side processing:
 * HEIC to JPEG, orientation fix, quality checks, resize to 2000 px, re-encode at 80%.
 * Re-encoding through a canvas also strips all metadata (location, camera details).
 * Only the processed version is returned. The original is never stored.
 */
export async function processImage(file: Blob, isHeic: boolean): Promise<ImageResult> {
  // Safari can often decode HEIC itself. Other browsers need the converter.
  let decoded = await decode(file);
  if (!decoded && isHeic) {
    const jpeg = await convertHeic(file);
    decoded = jpeg ? await decode(jpeg) : null;
  }
  if (!decoded) return { ok: false, reason: 'unreadable' };

  try {
    if (!meetsMinimumResolution(decoded.width, decoded.height)) {
      return { ok: false, reason: 'too_small' };
    }

    const sample = draw(decoded, BLANK_SAMPLE_SIZE, BLANK_SAMPLE_SIZE);
    const pixels = sample.getContext('2d')?.getImageData(0, 0, BLANK_SAMPLE_SIZE, BLANK_SAMPLE_SIZE).data;
    if (!pixels || isBlank(pixels)) return { ok: false, reason: 'unreadable' };

    const size = fitWithin(decoded.width, decoded.height);
    const blob = await toJpeg(draw(decoded, size.width, size.height));
    if (!blob) return { ok: false, reason: 'unreadable' };
    return { ok: true, blob, width: size.width, height: size.height };
  } catch {
    return { ok: false, reason: 'unreadable' };
  } finally {
    decoded.close();
  }
}
