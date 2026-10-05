import { useRef, useState, type ReactNode } from 'react';
import { formatDate, strings } from '../content/strings';
import type { RequestState } from '../domain/types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { describedBy, fieldId } from './ui/cx';
import { FieldError } from './ui/fields';
import { Send } from './ui/Icons';
import { RequestPill } from './ui/StatusPill';

/** How long the simulated "send" takes. Real email sending happens in the real build. */
const SIMULATED_SEND_MS = 700;

interface InviteCardProps {
  title: string;
  description: ReactNode;
  request: RequestState;
  /** "Completed" for forms and references, "Signed" for consent. */
  completedLabel: string;
  sendLabel: string;
  /** Checks the fields needed to send. Returns false when something is missing. */
  onValidate: () => Promise<boolean>;
  onSend: () => void;
  onChangeDetails: () => void;
  /** Form path used for the "send this first" error, for example "doctorRequest". */
  errorPath: string;
  error?: string;
  /** Extra controls, for example "Remove this reference". */
  extraActions?: ReactNode;
  children: ReactNode;
}

/**
 * A request to someone outside the application: a doctor, a teacher or counselor,
 * or a parent or guardian. Sending is simulated in the prototype.
 */
export function InviteCard({
  title,
  description,
  request,
  completedLabel,
  sendLabel,
  onValidate,
  onSend,
  onChangeDetails,
  errorPath,
  error,
  extraActions,
  children,
}: InviteCardProps) {
  const [sending, setSending] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const id = fieldId(errorPath);
  const errorId = error ? `${id}-error` : undefined;
  const notSent = request.status === 'not_sent';

  const handleSend = async () => {
    if (sending) return;
    if (!(await onValidate())) {
      requestAnimationFrame(() =>
        cardRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, SIMULATED_SEND_MS));
    onSend();
    setSending(false);
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  return (
    <div ref={cardRef}>
      <Card
        title={title}
        description={description}
        aside={<RequestPill status={request.status} completedLabel={completedLabel} />}
        className="invite-card"
      >
        <fieldset className="invite-fields" disabled={!notSent}>
          {children}
        </fieldset>

        <div className="invite-actions">
          {notSent ? (
            <Button
              id={id}
              onClick={() => void handleSend()}
              aria-disabled={sending || undefined}
              data-invalid={error ? 'true' : undefined}
              aria-describedby={describedBy(errorId)}
              iconBefore={<Send size={18} />}
            >
              {sending ? strings.request.sending : sendLabel}
            </Button>
          ) : null}
          <div role="status" className="invite-status-region">
            {!notSent && (
              <p ref={statusRef} tabIndex={-1} className="invite-status">
                {request.status === 'sent'
                  ? strings.request.sentTo(request.sentTo ?? '', formatDate(request.sentAt))
                  : strings.request.completedOn(completedLabel, formatDate(request.completedAt))}
              </p>
            )}
          </div>
          {request.status === 'sent' && (
            <button type="button" className="link-button" onClick={onChangeDetails}>
              {strings.request.changeDetails}
            </button>
          )}
          {extraActions}
        </div>
        <FieldError id={errorId} message={error} />
      </Card>
    </div>
  );
}
