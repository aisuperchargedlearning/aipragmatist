import type { DocumentPage } from '../domain/types';
import { blobStore } from '../documents/blobStore';
import { HEADER_BYTES, countPdfPages, detectFileType } from '../documents/fileType';
import { processImage } from '../documents/processImage';
import { MAX_UPLOAD_BYTES, type RejectionReason } from '../documents/quality';

export type ProcessResult = { ok: true; page: DocumentPage } | { ok: false; reason: RejectionReason };

/**
 * Checks, processes and stores uploaded documents. The real build moves this to the
 * server (processing, malware scanning, private S3, short-lived download links).
 * Screens only use this interface.
 */
export interface DocumentService {
  processFile(file: File): Promise<ProcessResult>;
  getPageFile(pageId: string): Promise<Blob | null>;
  removePage(pageId: string): Promise<void>;
  clearAll(): Promise<void>;
}

function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `page-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Prototype: processes files in the browser and keeps the processed result on this device. */
export class BrowserDocumentService implements DocumentService {
  async processFile(file: File): Promise<ProcessResult> {
    if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) return { ok: false, reason: 'unreadable' };

    let type;
    try {
      type = detectFileType(new Uint8Array(await file.slice(0, HEADER_BYTES).arrayBuffer()));
    } catch {
      return { ok: false, reason: 'unreadable' };
    }
    if (type === 'unknown') return { ok: false, reason: 'wrong_type' };

    if (type === 'pdf') {
      // PDFs are kept as they are. The server will scan and normalize them in the real build.
      const buffer = await file.arrayBuffer();
      const pageCount = countPdfPages(new TextDecoder('latin1').decode(buffer));
      const id = newId();
      await blobStore.put(id, new Blob([buffer], { type: 'application/pdf' }));
      return { ok: true, page: { id, kind: 'pdf', sizeBytes: buffer.byteLength, pageCount } };
    }

    const result = await processImage(file, type === 'heic');
    if (!result.ok) return result;
    const id = newId();
    await blobStore.put(id, result.blob);
    return {
      ok: true,
      page: { id, kind: 'image', sizeBytes: result.blob.size, width: result.width, height: result.height },
    };
  }

  getPageFile(pageId: string): Promise<Blob | null> {
    return blobStore.get(pageId);
  }

  removePage(pageId: string): Promise<void> {
    return blobStore.delete(pageId);
  }

  clearAll(): Promise<void> {
    return blobStore.clear();
  }
}
