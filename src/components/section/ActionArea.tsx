import { useNavigate } from 'react-router-dom';
import { strings } from '../../content/strings';
import { SECTION_COUNT } from '../../domain/sections';
import { Banner } from '../ui/Banner';
import { Button } from '../ui/Button';
import { ArrowLeft, ArrowRight } from '../ui/Icons';

interface ActionAreaProps {
  sectionNumber: number;
  locked: boolean;
  onSaveLater: () => void;
  saveLaterShown: boolean;
}

/**
 * Row A: "Save and finish later" on the left, Submit centered (the one primary button).
 * Row B: Previous and Next, which only navigate and never validate.
 * Submit is deliberately kept apart from Next. Do not move it to the right edge.
 */
export function ActionArea({ sectionNumber, locked, onSaveLater, saveLaterShown }: ActionAreaProps) {
  const navigate = useNavigate();
  const isFirst = sectionNumber <= 1;
  const isLast = sectionNumber >= SECTION_COUNT;

  return (
    <div className="action-area">
      <div className="action-confirm" role="status">
        {saveLaterShown && <Banner tone="success">{strings.actions.saveLaterConfirm}</Banner>}
      </div>

      <div className="action-save">
        <button type="button" className="link-button" onClick={onSaveLater}>
          {strings.actions.saveLater}
        </button>
      </div>

      <div className="action-submit">
        <Button type="submit" variant="primary" disabled={locked} aria-describedby="submit-helper">
          {strings.actions.submit}
        </Button>
        <p id="submit-helper" className="action-helper">
          {locked ? strings.actions.submitHelperLocked : strings.actions.submitHelper}
        </p>
      </div>

      <hr className="action-divider" />

      <div className="action-prev">
        <Button
          onClick={() => navigate(`/section/${sectionNumber - 1}`)}
          disabled={isFirst}
          iconBefore={<ArrowLeft size={18} />}
        >
          {strings.actions.previous}
        </Button>
      </div>

      <div className="action-next">
        <Button
          onClick={() => navigate(`/section/${sectionNumber + 1}`)}
          disabled={isLast}
          iconAfter={<ArrowRight size={18} />}
        >
          {strings.actions.next}
        </Button>
      </div>
    </div>
  );
}
