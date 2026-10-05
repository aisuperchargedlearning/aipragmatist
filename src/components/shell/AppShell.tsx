import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { strings } from '../../content/strings';
import type { SectionId } from '../../domain/types';
import { useCurrentUser, useServices } from '../../services/ServicesContext';
import { useApplication } from '../../state/ApplicationProvider';
import { DemoControls } from './DemoControls';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell({ currentId, children }: { currentId: SectionId; children: ReactNode }) {
  const user = useCurrentUser();
  const { auth } = useServices();
  const { resetDemo, saveNow } = useApplication();
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!window.confirm(strings.header.resetConfirm)) return;
    await resetDemo();
    navigate('/section/1');
  };

  const handleSignOut = async () => {
    await saveNow();
    await auth.signOut();
  };

  return (
    <div className="app">
      <Header user={user} onResetDemo={() => void handleReset()} onSignOut={() => void handleSignOut()} />
      <div className="layout">
        <Sidebar currentId={currentId} />
        <main id="main" className="main" tabIndex={-1}>
          <div className="main-inner">{children}</div>
        </main>
      </div>
      <DemoControls currentId={currentId} onResetDemo={() => void handleReset()} />
    </div>
  );
}
