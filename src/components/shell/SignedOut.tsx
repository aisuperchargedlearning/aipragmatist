import { useEffect } from 'react';
import { strings } from '../../content/strings';
import { Button } from '../ui/Button';
import { Header } from './Header';

export function SignedOut({ onSignIn }: { onSignIn: () => void }) {
  useEffect(() => {
    document.title = `${strings.signedOut.title} · NWSE Student Application`;
  }, []);

  return (
    <div className="app">
      <Header />
      <main id="main" className="signed-out">
        <div className="card signed-out-card">
          <h1 className="signed-out-title">{strings.signedOut.title}</h1>
          <p>{strings.signedOut.body}</p>
          <Button variant="primary" onClick={onSignIn}>
            {strings.signedOut.signIn}
          </Button>
        </div>
      </main>
    </div>
  );
}
