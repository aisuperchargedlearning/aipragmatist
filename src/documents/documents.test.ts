import { describe, expect, it } from 'vitest';
import { countPdfPages, detectFileType } from './fileType';
import { fitWithin, isBlank, meetsMinimumResolution } from './quality';

const bytes = (...values: number[]) => new Uint8Array(values);
const text = (s: string) => Array.from(s, (c) => c.charCodeAt(0));

function ftyp(major: string, ...compatible: string[]) {
  const body = [...text('ftyp'), ...text(major), 0, 0, 0, 0, ...compatible.flatMap(text)];
  const size = body.length + 4;
  return bytes(0, 0, 0, size, ...body);
}

describe('detectFileType', () => {
  it('recognizes JPEG, PNG and PDF from their first bytes', () => {
    expect(detectFileType(bytes(0xff, 0xd8, 0xff, 0xe0))).toBe('jpeg');
    expect(detectFileType(bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a))).toBe('png');
    expect(detectFileType(bytes(...text('%PDF-1.7')))).toBe('pdf');
  });

  it('recognizes HEIC by major or compatible brand', () => {
    expect(detectFileType(ftyp('heic', 'mif1', 'heic'))).toBe('heic');
    expect(detectFileType(ftyp('mif1', 'heic'))).toBe('heic');
  });

  it('does not treat AVIF as HEIC', () => {
    expect(detectFileType(ftyp('avif', 'mif1', 'miaf'))).toBe('unknown');
  });

  it('rejects files that only have a photo-like name', () => {
    expect(detectFileType(bytes(...text('Hello, this is a text file')))).toBe('unknown');
    expect(detectFileType(bytes())).toBe('unknown');
  });
});

describe('countPdfPages', () => {
  it('counts page objects but not the page tree', () => {
    expect(countPdfPages('<< /Type /Pages /Count 2 >> << /Type /Page >> << /Type/Page >>')).toBe(2);
    expect(countPdfPages('no pages here')).toBeUndefined();
  });
});

describe('image quality rules', () => {
  it('rejects photos that are too small to read', () => {
    expect(meetsMinimumResolution(4032, 3024)).toBe(true);
    expect(meetsMinimumResolution(800, 500)).toBe(true);
    expect(meetsMinimumResolution(640, 480)).toBe(false);
    expect(meetsMinimumResolution(100, 100)).toBe(false);
  });

  it('resizes the long edge to 2000 px and never enlarges', () => {
    expect(fitWithin(4032, 3024)).toEqual({ width: 2000, height: 1500 });
    expect(fitWithin(3024, 4032)).toEqual({ width: 1500, height: 2000 });
    expect(fitWithin(1200, 900)).toEqual({ width: 1200, height: 900 });
  });

  it('detects a blank image', () => {
    const white = new Uint8ClampedArray(64 * 64 * 4).fill(255);
    expect(isBlank(white)).toBe(true);
    const black = new Uint8ClampedArray(64 * 64 * 4);
    for (let i = 3; i < black.length; i += 4) black[i] = 255;
    expect(isBlank(black)).toBe(true);
  });

  it('accepts an image with real content', () => {
    // White page with dark "text" stripes.
    const page = new Uint8ClampedArray(64 * 64 * 4).fill(255);
    for (let row = 0; row < 64; row += 4) {
      for (let col = 8; col < 56; col++) {
        const o = (row * 64 + col) * 4;
        page[o] = page[o + 1] = page[o + 2] = 20;
      }
    }
    expect(isBlank(page)).toBe(false);
  });
});
