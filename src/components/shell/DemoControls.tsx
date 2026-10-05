import { useState } from 'react';
import { strings } from '../../content/strings';
import { sectionById } from '../../domain/sections';
import type { SectionId } from '../../domain/types';
import { useApplication } from '../../state/ApplicationProvider';
import { cx } from '../ui/cx';
import { Wrench } from '../ui/Icons';

function DemoAction({ label, onClick, disabledReason }: { label: string; onClick: () => void; disabledReason?: string }) {
  return (
    <div className="demo-action">
      <button type="button" className="demo-button" onClick={onClick} disabled={Boolean(disabledReason)}>
        {label}
      </button>
      {disabledReason && <p className="demo-reason">{disabledReason}</p>}
    </div>
  );
}

/**
 * Demo-only panel that stands in for the people and staff the real system will involve.
 * Not part of the student interface.
 */
export function DemoControls({ currentId, onResetDemo }: { currentId: SectionId; onResetDemo: () => void }) {
  const { application, setRequestStatus, setLocked } = useApplication();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { sections } = application;

  const doctorSent = sections.medical.requests.doctor?.status === 'sent';
  const pendingReference = Object.entries(sections.recommendations.requests).find(([, r]) => r.status === 'sent')?.[0];
  const consentSent = sections.additional.requests.consent?.status === 'sent';
  const current = sections[currentId];
  const meta = sectionById(currentId);
  const canLock = current.locked || current.status === 'submitted' || current.status === 'waiting_on_others';

  const run = (action: () => void) => {
    action();
    setMessage(strings.demo.done);
    window.setTimeout(() => setMessage(''), 2500);
  };

  return (
    <section className={cx('demo', open && 'is-open')} aria-label={strings.demo.title}>
      {open && (
        <div id="demo-panel" className="demo-panel">
          <h2 className="demo-title">{strings.demo.title}</h2>
          <p className="demo-note">{strings.demo.note}</p>

          <div className="demo-group">
            <DemoAction
              label={strings.demo.doctor}
              disabledReason={doctorSent ? undefined : strings.demo.needsSent}
              onClick={() => run(() => setRequestStatus('medical', 'doctor', 'completed'))}
            />
            <DemoAction
              label={strings.demo.teacher}
              disabledReason={pendingReference ? undefined : strings.demo.needsSent}
              onClick={() => pendingReference && run(() => setRequestStatus('recommendations', pendingReference, 'completed'))}
            />
            <DemoAction
              label={strings.demo.parent}
              disabledReason={consentSent ? undefined : strings.demo.needsSent}
              onClick={() => run(() => setRequestStatus('additional', 'consent', 'completed'))}
            />
          </div>

          <div className="demo-group">
            <p className="demo-context">{`Section ${meta.number}: ${meta.title}`}</p>
            <DemoAction
              label={current.locked ? strings.demo.unlock : strings.demo.lock}
              disabledReason={canLock ? undefined : strings.demo.needsSubmit}
              onClick={() => run(() => setLocked(currentId, !current.locked))}
            />
          </div>

          <div className="demo-group">
            <DemoAction label={strings.demo.reset} onClick={onResetDemo} />
          </div>

          <p className="demo-message" role="status">
            {message}
          </p>
        </div>
      )}
      <button
        type="button"
        className="demo-toggle"
        aria-expanded={open}
        aria-controls="demo-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <Wrench size={18} />
        {strings.demo.toggle}
      </button>
    </section>
  );
}
