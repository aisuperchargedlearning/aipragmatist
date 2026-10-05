import type { Application, SectionId, SectionState } from '../domain/types';
import { identityDemoValues } from '../sections/identity/schema';

/** Bump when the stored shape changes. Older demo data in the browser is then replaced. */
export const SCHEMA_VERSION = 1;

const empty = (): SectionState => ({ status: 'not_started', data: {}, locked: false, requests: {} });

/** Starting point for the demo: section 1 is pre-filled as in the approved design. */
export function createSeedApplication(studentId: string): Application {
  const sections: Record<SectionId, SectionState> = {
    identity: { ...empty(), status: 'in_progress', data: { ...identityDemoValues } },
    school: empty(),
    medical: empty(),
    insurance: empty(),
    recommendations: empty(),
    additional: empty(),
  };
  return { studentId, schemaVersion: SCHEMA_VERSION, sections };
}
