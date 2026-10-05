import { useEffect, useId, useRef, useState, type DragEvent } from 'react';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';
import { strings } from '../../content/strings';
import { MAX_PAGES, MIN_CHECKING_MS, type RejectionReason } from '../../documents/quality';
import type { DocumentPage, UploadedDocument } from '../../domain/types';
import { useServices } from '../../services/ServicesContext';
import { cx, describedBy, fieldId } from '../ui/cx';
import { FieldError, RequiredMark } from '../ui/fields';
import { Camera, Close, FileText, Spinner } from '../ui/Icons';

const ACCEPT = 'image/jpeg,image/png,image/heic,image/heif,.heic,.heif,application/pdf';

function formatBytes(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function PageThumb({ page, index, label, onRemove }: { page: DocumentPage; index: number; label: string; onRemove: () => void }) {
  const { documents } = useServices();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (page.kind !== 'image') return;
    let active = true;
    let objectUrl: string | null = null;
    void documents.getPageFile(page.id).then((blob) => {
      if (!active || !blob) return;
      objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);
    });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [documents, page.id, page.kind]);

  const detail =
    page.kind === 'pdf'
      ? `${strings.upload.pdf}${page.pageCount ? ` · ${strings.upload.pages(page.pageCount)}` : ''}`
      : formatBytes(page.sizeBytes);

  return (
    <li className="page-thumb">
      <div className="page-thumb-preview">
        {page.kind === 'image' && url ? <img src={url} alt="" /> : <FileText size={26} />}
      </div>
      <div className="page-thumb-meta">
        <span>{strings.upload.page(index + 1)}</span>
        <span className="page-thumb-detail">{detail}</span>
      </div>
      <button type="button" className="icon-button" aria-label={strings.upload.removePage(label, index + 1)} onClick={onRemove}>
        <Close size={18} />
      </button>
    </li>
  );
}

interface UploadTileProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  hint?: string;
  required?: boolean;
  /** Allow several photos to make one multi-page document (for example a transcript). */
  multiPage?: boolean;
  onCheckingChange?: (checking: boolean) => void;
}

/** Large dashed tile: "Take a photo or choose a file". On a phone this offers the camera. */
export function UploadTile<T extends FieldValues>({
  control,
  name,
  label,
  hint,
  required,
  multiPage = true,
  onCheckingChange,
}: UploadTileProps<T>) {
  const { documents } = useServices();
  const { field, fieldState } = useController({ control, name });
  const doc = (field.value as UploadedDocument | null | undefined) ?? null;
  const pages = doc?.pages ?? [];

  const inputRef = useRef<HTMLInputElement>(null);
  const [checking, setChecking] = useState(false);
  const [rejection, setRejection] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const uid = useId();
  const id = fieldId(name);
  const labelId = `${uid}-label`;
  const hintId = hint ? `${uid}-hint` : undefined;
  const tileHintId = `${uid}-tile-hint`;
  const errorId = fieldState.error ? `${id}-error` : undefined;

  const setCheckingState = (value: boolean) => {
    setChecking(value);
    onCheckingChange?.(value);
  };

  const handleFiles = async (list: FileList | File[] | null) => {
    const files = Array.from(list ?? []);
    if (files.length === 0 || checking) return;
    const room = multiPage ? MAX_PAGES - pages.length : 1;
    if (files.length > room) {
      setRejection(strings.upload.tooManyPages(MAX_PAGES));
      return;
    }

    setRejection(null);
    setCheckingState(true);
    const started = Date.now();
    const accepted: DocumentPage[] = [];
    let rejected: RejectionReason | null = null;
    for (const file of files) {
      const result = await documents.processFile(file);
      if (result.ok) accepted.push(result.page);
      else rejected ??= result.reason;
    }
    await new Promise((r) => setTimeout(r, Math.max(0, MIN_CHECKING_MS - (Date.now() - started))));
    setCheckingState(false);

    if (accepted.length > 0) {
      if (!multiPage) pages.forEach((p) => void documents.removePage(p.id));
      const next: UploadedDocument = {
        pages: multiPage ? [...pages, ...accepted] : accepted,
        receivedAt: new Date().toISOString(),
      };
      field.onChange(next);
    }
    if (rejected) setRejection(strings.upload.rejection[rejected]);
  };

  const removePage = (pageId: string) => {
    void documents.removePage(pageId);
    const remaining = pages.filter((p) => p.id !== pageId);
    field.onChange(remaining.length ? { ...doc, pages: remaining } : null);
  };

  const onDrop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDragging(false);
    void handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="upload-field">
      <p className="field-label" id={labelId}>
        {label}
        {required && <RequiredMark />}
      </p>
      {hint && (
        <p className="field-hint" id={hintId}>
          {hint}
        </p>
      )}

      <button
        type="button"
        ref={field.ref}
        className={cx('upload-tile', dragging && 'is-dragging', pages.length > 0 && 'upload-tile--compact')}
        onClick={() => !checking && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        aria-disabled={checking || undefined}
        aria-labelledby={labelId}
        aria-describedby={describedBy(hintId, tileHintId, errorId)}
        data-invalid={fieldState.error ? 'true' : undefined}
      >
        <Camera size={pages.length > 0 ? 22 : 30} />
        <span className="upload-tile-title">
          {pages.length > 0 && multiPage ? strings.upload.tileAddPage : strings.upload.tile}
        </span>
        <span className="upload-tile-hint" id={tileHintId}>
          {pages.length > 0 && multiPage ? strings.upload.tile : strings.upload.tileHint}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        className="visually-hidden"
        tabIndex={-1}
        aria-hidden="true"
        accept={ACCEPT}
        multiple={multiPage}
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = '';
        }}
      />

      <div role="status" className="upload-status">
        {checking && (
          <p className="upload-checking">
            <Spinner size={18} />
            {strings.upload.checking}
          </p>
        )}
      </div>
      <div role="alert">{rejection && <FieldError message={rejection} />}</div>
      <FieldError id={errorId} message={fieldState.error?.message} />

      {pages.length > 0 && (
        <ul className="page-list" aria-label={label}>
          {pages.map((page, index) => (
            <PageThumb key={page.id} page={page} index={index} label={label} onRemove={() => removePage(page.id)} />
          ))}
        </ul>
      )}
    </div>
  );
}
