import { useState, type ReactNode } from 'react';
import { useWatch, type Control, type FieldValues, type Path } from 'react-hook-form';
import { strings } from '../../content/strings';
import type { UploadedDocument } from '../../domain/types';
import { Card } from '../ui/Card';
import { DocumentRow, type DocumentState } from './DocumentRow';
import { UploadTile } from './UploadTile';

export interface DocumentSpec<T extends FieldValues> {
  name: Path<T>;
  label: string;
  hint?: string;
  required: boolean;
  multiPage?: boolean;
}

interface DocumentsCardProps<T extends FieldValues> {
  title: string;
  description?: ReactNode;
  control: Control<T>;
  documents: DocumentSpec<T>[];
}

/** Upload tiles for a section, with a checklist of what has been received. */
export function DocumentsCard<T extends FieldValues>({ title, description, control, documents }: DocumentsCardProps<T>) {
  const [checking, setChecking] = useState<Record<string, boolean>>({});
  const values = useWatch({ control }) as Record<string, unknown>;

  const stateOf = (spec: DocumentSpec<T>): { state: DocumentState; detail?: string } => {
    if (checking[spec.name]) return { state: 'checking' };
    const doc = values[spec.name] as UploadedDocument | null | undefined;
    if (doc?.pages.length) return { state: 'received', detail: strings.upload.pages(doc.pages.length) };
    return { state: spec.required ? 'needed' : 'optional' };
  };

  return (
    <Card title={title} description={description}>
      <div className="upload-list">
        {documents.map((spec) => (
          <UploadTile
            key={spec.name}
            control={control}
            name={spec.name}
            label={spec.label}
            hint={spec.hint}
            required={spec.required}
            multiPage={spec.multiPage}
            onCheckingChange={(value) => setChecking((s) => ({ ...s, [spec.name]: value }))}
          />
        ))}
      </div>

      <div className="checklist">
        <h3 className="checklist-title">{strings.upload.checklistTitle}</h3>
        <ul className="checklist-rows">
          {documents.map((spec) => {
            const { state, detail } = stateOf(spec);
            return <DocumentRow key={spec.name} label={spec.label} state={state} detail={detail} />;
          })}
        </ul>
      </div>
    </Card>
  );
}
