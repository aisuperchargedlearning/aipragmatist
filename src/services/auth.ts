import type { User } from '../domain/types';

/**
 * Who is signed in. The real build replaces the demo with AWS Cognito
 * (groups: "students" and "staff"). Screens only use this interface.
 */
export interface AuthService {
  getCurrentUser(): User | null;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  subscribe(listener: () => void): () => void;
}

export const DEMO_STUDENT: User = {
  id: 'demo-student-0001',
  name: 'Emma Thompson',
  initials: 'ET',
  email: 'emma@example.com',
  role: 'student',
};

/** Prototype: one hard-coded demo student who is signed in on every page load. */
export class DemoAuthService implements AuthService {
  private user: User | null = DEMO_STUDENT;
  private listeners = new Set<() => void>();

  getCurrentUser(): User | null {
    return this.user;
  }

  async signIn(): Promise<void> {
    this.user = DEMO_STUDENT;
    this.emit();
  }

  async signOut(): Promise<void> {
    this.user = null;
    this.emit();
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }
}
