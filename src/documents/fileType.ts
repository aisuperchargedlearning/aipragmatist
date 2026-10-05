export type DetectedFileType = 'jpeg' | 'png' | 'heic' | 'pdf' | 'unknown';

/** Bytes to read from the start of a file to identify it. */
export const HEADER_BYTES = 64;

const HEIF_BRANDS = new Set(['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs', 'mif1', 'msf1']);

function startsWith(bytes: Uint8Array, signature: number[]): boolean {
  return signature.every((b, i) => bytes[i] === b);
}

function ascii(bytes: Uint8Array, start: number, end: number): string {
  return String.fromCharCode(...bytes.subarray(start, end));
}

/**
 * Identifies a file from its first bytes ("magic numbers"), not its name or extension,
 * so a renamed file cannot pass as a photo.
 */
export function detectFileType(bytes: Uint8Array): DetectedFileType {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return 'jpeg';
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'png';
  if (startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d])) return 'pdf'; // "%PDF-"

  // HEIC/HEIF: an ISO media "ftyp" box at byte 4, then a major brand and compatible brands.
  if (bytes.length >= 12 && ascii(bytes, 4, 8) === 'ftyp') {
    const boxSize = Math.min(
      ((bytes[0] ?? 0) << 24) | ((bytes[1] ?? 0) << 16) | ((bytes[2] ?? 0) << 8) | (bytes[3] ?? 0),
      bytes.length,
    );
    const brands = [ascii(bytes, 8, 12)];
    for (let i = 16; i + 4 <= boxSize; i += 4) brands.push(ascii(bytes, i, i + 4));
    if (brands.includes('avif') || brands.includes('avis')) return 'unknown';
    if (brands.some((b) => HEIF_BRANDS.has(b))) return 'heic';
  }
  return 'unknown';
}

/** Rough page count for a PDF, used only for display. Returns undefined when it cannot tell. */
export function countPdfPages(text: string): number | undefined {
  const matches = text.match(/\/Type\s*\/Page(?!s)/g);
  return matches && matches.length > 0 ? matches.length : undefined;
}
