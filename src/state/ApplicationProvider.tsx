import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  applyEdit,
  applyLock,
  applyRequestStatus,
  applySubmit,
  removeRequest as removeRequestFrom,
} from '../domain/status';
import type { Application, RequestStatus, SectionData, SectionId, SectionState } from '../domain/types';
import { useServices } from '../services/ServicesContext';

export const AUTOSAVE_DELAY_MS = 800;

export type SaveStatus = 'saved' | 'saving';

interface ApplicationStore {
  application: Application;
  saveStatus: SaveStatus;
  /** Changes when demo data is reset, so open forms start over. */
  resetToken: number;
  updateSectionData(id: SectionId, data: SectionData): void;
  submitSection(id: SectionId, data: SectionData): void;
  saveNow(): Promise<void>;
  setRequestStatus(id: SectionId, requestId: string, status: RequestStatus, sentTo?: string): void;
  removeRequest(id: SectionId, requestId: string): void;
  setLocked(id: SectionId, locked: boolean): void;
  resetDemo(): Promise<void>;
}

const ApplicationContext = createContext<ApplicationStore | null>(null);

const now = () => new Date().toISOString();

function updateSection(id: SectionId, change: (s: SectionState) => SectionState) {
  return (app: Application): Application => {
    const current = app.sections[id];
    const next = change(current);
    return next === current ? app : { ...app, sections: { ...app.sections, [id]: next } };
  };
}

export function ApplicationProvider({ studentId, children }: { studentId: string; children: ReactNode }) {
  const { applications, documents } = useServices();
  const [application, setApplication] = useState<Application | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const [resetToken, setResetToken] = useState(0);
  const appRef = useRef<Application | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void applications.load(studentId).then((app) => {
      if (cancelled) return;
      appRef.current = app;
      setApplication(app);
    });
    return () => {
      cancelled = true;
    };
  }, [applications, studentId]);

  const persist = useCallback(async () => {
    const app = appRef.current;
    if (!app) return;
    await applications.save(app);
    if (timer.current === null) setSaveStatus('saved');
  }, [applications]);

  const commit = useCallback(
    (update: (app: Application) => Application, mode: 'debounced' | 'immediate') => {
      const current = appRef.current;
      if (!current) return;
      const next = update(current);
      if (next === current) return;
      appRef.current = next;
      setApplication(next);
      setSaveStatus('saving');
      if (timer.current !== null) window.clearTimeout(timer.current);
      if (mode === 'immediate') {
        timer.current = null;
        void persist();
      } else {
        timer.current = window.setTimeout(() => {
          timer.current = null;
          void persist();
        }, AUTOSAVE_DELAY_MS);
      }
    },
    [persist],
  );

  // Save anything pending if the tab is closed or hidden before the autosave delay ends.
  useEffect(() => {
    const flush = () => {
      if (timer.current === null || !appRef.current) return;
      window.clearTimeout(timer.current);
      timer.current = null;
      void applications.save(appRef.current);
    };
    const onVisibility = () => document.visibilityState === 'hidden' && flush();
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [applications]);

  const store = useMemo<ApplicationStore | null>(() => {
    if (!application) return null;
    return {
      application,
      saveStatus,
      resetToken,
      updateSectionData: (id, data) =>
        commit(
          updateSection(id, (s) => (JSON.stringify(s.data) === JSON.stringify(data) ? s : applyEdit(s, data))),
          'debounced',
        ),
      submitSection: (id, data) => commit(updateSection(id, (s) => applySubmit(s, data, now())), 'immediate'),
      saveNow: async () => {
        if (timer.current !== null) window.clearTimeout(timer.current);
        timer.current = null;
        setSaveStatus('saving');
        await persist();
      },
      setRequestStatus: (id, requestId, status, sentTo) =>
        commit(updateSection(id, (s) => applyRequestStatus(s, requestId, status, now(), sentTo)), 'immediate'),
      removeRequest: (id, requestId) =>
        commit(updateSection(id, (s) => removeRequestFrom(s, requestId)), 'immediate'),
      setLocked: (id, locked) => commit(updateSection(id, (s) => applyLock(s, locked)), 'immediate'),
      resetDemo: async () => {
        if (timer.current !== null) window.clearTimeout(timer.current);
        timer.current = null;
        await documents.clearAll();
        const fresh = await applications.reset(studentId);
        appRef.current = fresh;
        setApplication(fresh);
        setSaveStatus('saved');
        setResetToken((t) => t + 1);
      },
    };
  }, [application, saveStatus, resetToken, commit, persist, applications, documents, studentId]);

  if (!store) {
    return (
      <p className="loading" role="status">
        Loading your application…
      </p>
    );
  }
  return <ApplicationContext.Provider value={store}>{children}</ApplicationContext.Provider>;
}

export function useApplication(): ApplicationStore {
  const store = useContext(ApplicationContext);
  if (!store) throw new Error('useApplication must be used inside ApplicationProvider');
  return store;
}
