import type { ComponentType } from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { AppShell } from './components/shell/AppShell';
import { SignedOut } from './components/shell/SignedOut';
import { sectionByNumber } from './domain/sections';
import type { SectionId } from './domain/types';
import { AdditionalSection } from './sections/additional/AdditionalSection';
import { IdentitySection } from './sections/identity/IdentitySection';
import { InsuranceSection } from './sections/insurance/InsuranceSection';
import { MedicalSection } from './sections/medical/MedicalSection';
import { RecommendationsSection } from './sections/recommendations/RecommendationsSection';
import { SchoolSection } from './sections/school/SchoolSection';
import { useCurrentUser, useServices } from './services/ServicesContext';
import { ApplicationProvider, useApplication } from './state/ApplicationProvider';

const SECTION_SCREENS: Record<SectionId, ComponentType> = {
  identity: IdentitySection,
  school: SchoolSection,
  medical: MedicalSection,
  insurance: InsuranceSection,
  recommendations: RecommendationsSection,
  additional: AdditionalSection,
};

function SectionPage() {
  const { number } = useParams();
  const { resetToken } = useApplication();
  const meta = sectionByNumber(Number(number));
  if (!meta) return <Navigate to="/section/1" replace />;
  const Screen = SECTION_SCREENS[meta.id];
  return (
    <AppShell currentId={meta.id}>
      {/* A new key gives each section (and each demo reset) a fresh form. */}
      <Screen key={`${meta.id}-${resetToken}`} />
    </AppShell>
  );
}

export function App() {
  const user = useCurrentUser();
  const { auth } = useServices();

  if (!user) return <SignedOut onSignIn={() => void auth.signIn()} />;

  return (
    <ApplicationProvider studentId={user.id}>
      {/* Hash URLs (/#/section/3) work on any static host without rewrite rules. */}
      <HashRouter>
        <Routes>
          <Route path="/section/:number" element={<SectionPage />} />
          <Route path="*" element={<Navigate to="/section/1" replace />} />
        </Routes>
      </HashRouter>
    </ApplicationProvider>
  );
}
