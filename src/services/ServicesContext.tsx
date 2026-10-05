import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';
import type { User } from '../domain/types';
import { LocalStorageApplicationRepository, type ApplicationRepository } from './applicationRepository';
import { DemoAuthService, type AuthService } from './auth';
import { BrowserDocumentService, type DocumentService } from './documentService';

export interface Services {
  auth: AuthService;
  applications: ApplicationRepository;
  documents: DocumentService;
}

/** Swap these three for the real implementations in the production build. */
export function createDemoServices(): Services {
  return {
    auth: new DemoAuthService(),
    applications: new LocalStorageApplicationRepository(),
    documents: new BrowserDocumentService(),
  };
}

const ServicesContext = createContext<Services | null>(null);

export function ServicesProvider({ services, children }: { services: Services; children: ReactNode }) {
  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
}

export function useServices(): Services {
  const services = useContext(ServicesContext);
  if (!services) throw new Error('useServices must be used inside ServicesProvider');
  return services;
}

export function useCurrentUser(): User | null {
  const { auth } = useServices();
  return useSyncExternalStore(
    (listener) => auth.subscribe(listener),
    () => auth.getCurrentUser(),
  );
}
