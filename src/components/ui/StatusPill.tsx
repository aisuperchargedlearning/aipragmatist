import { strings } from '../../content/strings';
import type { RequestStatus, SectionStatus } from '../../domain/types';
import { cx } from './cx';
import { Check, Clock } from './Icons';

/** Section status. Color always comes with text, never alone. */
export function StatusPill({ status, className }: { status: SectionStatus; className?: string }) {
  return (
    <span className={cx('pill', `pill--${status}`, className)}>
      {status === 'submitted' && <Check size={14} />}
      {status === 'waiting_on_others' && <Clock size={14} />}
      {strings.status[status]}
    </span>
  );
}

const REQUEST_TONE: Record<RequestStatus, SectionStatus> = {
  not_sent: 'not_started',
  sent: 'waiting_on_others',
  completed: 'submitted',
};

/** Status of a request to a doctor, teacher or parent. */
export function RequestPill({ status, completedLabel }: { status: RequestStatus; completedLabel: string }) {
  const tone = REQUEST_TONE[status];
  const label = status === 'completed' ? completedLabel : strings.request[status];
  return (
    <span className={cx('pill', `pill--${tone}`)}>
      {status === 'completed' && <Check size={14} />}
      {status === 'sent' && <Clock size={14} />}
      {label}
    </span>
  );
}
