export type SectionId =
  | 'identity'
  | 'school'
  | 'medical'
  | 'insurance'
  | 'recommendations'
  | 'additional';

export type SectionStatus = 'not_started' | 'in_progress' | 'waiting_on_others' | 'submitted';

export type Role = 'student' | 'staff';

export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: Role;
}

/** A request sent to someone else (doctor, teacher or counselor, parent or guardian). */
export type RequestStatus = 'not_sent' | 'sent' | 'completed';

export interface RequestState {
  status: RequestStatus;
  sentTo?: string;
  sentAt?: string;
  completedAt?: string;
}

/** Form values for one section. Each section module defines its own shape. */
export type SectionData = Record<string, unknown>;

export interface SectionState {
  status: SectionStatus;
  data: SectionData;
  submittedAt?: string;
  /** True once staff begin reviewing. The section is then read-only. */
  locked: boolean;
  /** Outside requests for this section, keyed by request id (for example "doctor"). */
  requests: Record<string, RequestState>;
}

export interface Application {
  /** Every record carries its owner. The real API must check this on every read and write. */
  studentId: string;
  schemaVersion: number;
  sections: Record<SectionId, SectionState>;
}

/** One processed page of an uploaded document. The file itself lives in the DocumentService. */
export interface DocumentPage {
  id: string;
  kind: 'image' | 'pdf';
  sizeBytes: number;
  width?: number;
  height?: number;
  /** For PDFs, when it can be counted. */
  pageCount?: number;
}

export interface UploadedDocument {
  pages: DocumentPage[];
  receivedAt: string;
}
