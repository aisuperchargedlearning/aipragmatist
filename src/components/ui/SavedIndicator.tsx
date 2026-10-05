import { strings } from '../../content/strings';
import type { SaveStatus } from '../../state/ApplicationProvider';
import { CheckCircleFilled, Spinner } from './Icons';

/** The one place on screen that shows save state. */
export function SavedIndicator({ status }: { status: SaveStatus }) {
  return (
    <p className="saved-indicator" role="status">
      {status === 'saving' ? <Spinner size={20} /> : <CheckCircleFilled />}
      <span>{status === 'saving' ? strings.saved.saving : strings.saved.saved}</span>
    </p>
  );
}
