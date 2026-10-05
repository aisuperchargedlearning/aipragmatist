import { strings } from '../../content/strings';
import { cx } from '../ui/cx';
import { Check, Clock, FileText } from '../ui/Icons';

export type DocumentState = 'received' | 'checking' | 'needed' | 'optional';

const LABELS: Record<DocumentState, string> = {
  received: strings.upload.received,
  checking: strings.upload.checkingShort,
  needed: strings.upload.needed,
  optional: strings.upload.optional,
};

/** One row of the document checklist. */
export function DocumentRow({ label, state, detail }: { label: string; state: DocumentState; detail?: string }) {
  return (
    <li className="doc-row">
      <span className="doc-row-label">
        <FileText size={18} />
        <span>
          {label}
          {detail && <span className="doc-row-detail"> · {detail}</span>}
        </span>
      </span>
      <span className={cx('doc-state', `doc-state--${state}`)}>
        {state === 'received' && <Check size={14} />}
        {state === 'checking' && <Clock size={14} />}
        {LABELS[state]}
      </span>
    </li>
  );
}
