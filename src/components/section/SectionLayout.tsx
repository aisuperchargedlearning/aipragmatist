import { useEffect, useRef, type ReactNode } from 'react';
import { formatDate, strings } from '../../content/strings';
import { SECTION_COUNT, sectionById } from '../../domain/sections';
import type { SectionId } from '../../domain/types';
import type { SectionController } from '../../forms/useSectionForm';
import { useApplication } from '../../state/ApplicationProvider';
import { Banner } from '../ui/Banner';
import { RequiredMark } from '../ui/fields';
import { SavedIndicator } from '../ui/SavedIndicator';
import { ActionArea } from './ActionArea';

let isFirstSectionView = true;

interface SectionLayoutProps {
  sectionId: SectionId;
  controller: SectionController;
  children: ReactNode;
}

export function SectionLayout({ sectionId, controller, children }: SectionLayoutProps) {
  const meta = sectionById(sectionId);
  const { saveStatus } = useApplication();
  const { section, formRef, statusBannerRef, onSubmit, showErrorSummary, errorCount, locked } = controller;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = strings.section.documentTitle(meta.title);
  }, [meta.title]);

  // After moving between sections, start at the top and move focus to the new heading.
  useEffect(() => {
    if (isFirstSectionView) {
      isFirstSectionView = false;
      return;
    }
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  let statusBanner: ReactNode = null;
  if (locked) {
    statusBanner = (
      <Banner tone="locked" role="status" ref={statusBannerRef} focusable>
        {strings.banners.locked}
      </Banner>
    );
  } else if (section.status === 'submitted') {
    statusBanner = (
      <Banner tone="success" role="status" ref={statusBannerRef} focusable>
        {strings.banners.submitted(formatDate(section.submittedAt))}
      </Banner>
    );
  } else if (section.status === 'waiting_on_others') {
    statusBanner = (
      <Banner tone="waiting" role="status" ref={statusBannerRef} focusable>
        {strings.banners.waiting(meta.waitsOn ?? 'others')}
      </Banner>
    );
  } else if (section.status === 'in_progress' && section.submittedAt) {
    statusBanner = (
      <Banner tone="info" role="status" ref={statusBannerRef} focusable>
        {strings.banners.changedAfterSubmit}
      </Banner>
    );
  }

  return (
    <form ref={formRef} className="section-form" noValidate onSubmit={onSubmit} aria-labelledby="section-title">
      <header className="section-header">
        <div className="section-heading">
          <p className="eyebrow">{strings.section.eyebrow(meta.number, SECTION_COUNT)}</p>
          <h1 id="section-title" className="section-title" ref={headingRef} tabIndex={-1}>
            {meta.title}
          </h1>
          <p className="section-instruction">{meta.instruction}</p>
        </div>
        <div className="section-aside">
          <SavedIndicator status={saveStatus} />
          <p className="required-note">
            <RequiredMark /> {strings.section.requiredNote}
          </p>
        </div>
      </header>

      <div className="section-messages">
        {statusBanner}
        <div role="alert">
          {showErrorSummary && <Banner tone="error">{strings.banners.errorSummary(errorCount)}</Banner>}
        </div>
      </div>

      <fieldset className="section-fields" disabled={locked}>
        {children}
      </fieldset>

      <ActionArea
        sectionNumber={meta.number}
        locked={locked}
        onSaveLater={() => void controller.saveLater()}
        saveLaterShown={controller.saveLaterShown}
      />
    </form>
  );
}
