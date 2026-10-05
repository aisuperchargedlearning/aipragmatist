import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { strings } from '../../content/strings';
import { SECTIONS, SECTION_COUNT, sectionById, type SectionMeta } from '../../domain/sections';
import { countSubmitted } from '../../domain/status';
import type { SectionId, SectionStatus } from '../../domain/types';
import { useApplication } from '../../state/ApplicationProvider';
import { cx } from '../ui/cx';
import { ChevronDown, Clock } from '../ui/Icons';
import { StatusPill } from '../ui/StatusPill';

function SectionNavItem({ meta, status, current }: { meta: SectionMeta; status: SectionStatus; current: boolean }) {
  return (
    <li>
      <Link
        to={`/section/${meta.number}`}
        className={cx('nav-item', current && 'is-current')}
        aria-current={current ? 'step' : undefined}
      >
        <span className="nav-number" aria-hidden="true">
          {meta.number}
        </span>
        <span className="nav-title">
          <span className="visually-hidden">{`Section ${meta.number}: `}</span>
          {meta.title}
        </span>
        <StatusPill status={status} className="nav-pill" />
      </Link>
    </li>
  );
}

function Legend() {
  return (
    <ul className="legend" aria-label={strings.sidebar.legendLabel}>
      <li>
        <span className="legend-dot legend-dot--submitted" aria-hidden="true" />
        {strings.status.submitted}
      </li>
      <li>
        <span className="legend-dot legend-dot--in_progress" aria-hidden="true" />
        {strings.status.in_progress}
      </li>
      <li>
        <Clock size={13} className="legend-clock" />
        {strings.status.waiting_on_others}
      </li>
      <li>
        <span className="legend-dot legend-dot--not_started" aria-hidden="true" />
        {strings.status.not_started}
      </li>
    </ul>
  );
}

/** Desktop: the left sidebar. Mobile: a compact bar that opens the same list. */
export function Sidebar({ currentId }: { currentId: SectionId }) {
  const { application } = useApplication();
  const [open, setOpen] = useState(false);
  const current = sectionById(currentId);
  const progress = strings.sidebar.progress(countSubmitted(application), SECTION_COUNT);

  useEffect(() => setOpen(false), [currentId]);

  const list = (
    <nav aria-label={strings.sidebar.navLabel}>
      <ol className="nav-list">
        {SECTIONS.map((s) => (
          <SectionNavItem key={s.id} meta={s} status={application.sections[s.id].status} current={s.id === currentId} />
        ))}
      </ol>
    </nav>
  );

  return (
    <>
      <aside className="sidebar" aria-labelledby="sidebar-heading">
        <div className="sidebar-top">
          <h2 id="sidebar-heading" className="sidebar-heading">
            {strings.sidebar.heading}
          </h2>
          <p className="sidebar-subtext">{strings.sidebar.subtext}</p>
          <p className="sidebar-progress">{progress}</p>
        </div>
        {list}
        <Legend />
      </aside>

      <div className="section-bar">
        <button
          type="button"
          className="section-bar-button"
          aria-expanded={open}
          aria-controls="mobile-sections"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="section-bar-label">
            {strings.sidebar.compactBar(current.number, SECTION_COUNT, current.title)}
          </span>
          <ChevronDown size={20} className={cx('section-bar-chevron', open && 'is-open')} />
        </button>
        {open && (
          <div id="mobile-sections" className="section-bar-panel">
            <p className="sidebar-progress">{progress}</p>
            {list}
            <Legend />
          </div>
        )}
      </div>
    </>
  );
}
