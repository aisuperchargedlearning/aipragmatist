import type { Application } from '../domain/types';
import { createSeedApplication, SCHEMA_VERSION } from './seed';

/**
 * Loads and saves a student's application. The real build replaces the demo with
 * API Gateway and Lambda, which must check on the server that the signed-in
 * student owns the record. Screens only use this interface.
 */
export interface ApplicationRepository {
  load(studentId: string): Promise<Application>;
  save(application: Application): Promise<void>;
  reset(studentId: string): Promise<Application>;
}

const keyFor = (studentId: string) => `nwse-demo:application:${studentId}`;

/** Prototype: keeps the application in this browser's localStorage. */
export class LocalStorageApplicationRepository implements ApplicationRepository {
  private memoryFallback = new Map<string, string>();

  async load(studentId: string): Promise<Application> {
    const raw = this.read(keyFor(studentId));
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Application;
        // Stand-in for the server-side ownership check.
        if (parsed.studentId === studentId && parsed.schemaVersion === SCHEMA_VERSION) {
          return parsed;
        }
      } catch {
        // Fall through and start fresh.
      }
    }
    const seed = createSeedApplication(studentId);
    await this.save(seed);
    return seed;
  }

  /** Writes synchronously before the promise resolves, so it is safe to call while the page unloads. */
  async save(application: Application): Promise<void> {
    this.write(keyFor(application.studentId), JSON.stringify(application));
  }

  async reset(studentId: string): Promise<Application> {
    const seed = createSeedApplication(studentId);
    await this.save(seed);
    return seed;
  }

  private read(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return this.memoryFallback.get(key) ?? null;
    }
  }

  private write(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      this.memoryFallback.set(key, value);
    }
  }
}
