import type {
  Application,
  RequestState,
  RequestStatus,
  SectionData,
  SectionState,
} from './types';

/** A request is outstanding when it has been sent but the other person has not responded. */
export function hasOutstandingRequests(section: SectionState): boolean {
  return Object.values(section.requests).some((r) => r.status === 'sent');
}

/**
 * The student changed a field. A locked section ignores edits.
 * Not started, Submitted and Waiting on others all become In progress.
 */
export function applyEdit(section: SectionState, data: SectionData): SectionState {
  if (section.locked) return section;
  return { ...section, data, status: 'in_progress' };
}

/** The student submitted a valid section. */
export function applySubmit(section: SectionState, data: SectionData, now: string): SectionState {
  if (section.locked) return section;
  return {
    ...section,
    data,
    submittedAt: now,
    status: hasOutstandingRequests(section) ? 'waiting_on_others' : 'submitted',
  };
}

/**
 * A request changed state (sent, completed by the other person, or reset by the student).
 * When the last outstanding request comes back, Waiting on others becomes Submitted.
 * Resetting a request to Not sent changes what the student submitted, so it counts as an edit.
 */
export function applyRequestStatus(
  section: SectionState,
  requestId: string,
  status: RequestStatus,
  now: string,
  sentTo?: string,
): SectionState {
  if (section.locked && status !== 'completed') return section;

  const previous = section.requests[requestId];
  const next: RequestState =
    status === 'not_sent'
      ? { status }
      : status === 'sent'
        ? { status, sentTo: sentTo ?? previous?.sentTo, sentAt: now }
        : { ...previous, status, completedAt: now };

  const updated: SectionState = {
    ...section,
    requests: { ...section.requests, [requestId]: next },
  };

  if (status === 'not_sent' && (section.status === 'submitted' || section.status === 'waiting_on_others')) {
    return { ...updated, status: 'in_progress' };
  }
  if (updated.status === 'waiting_on_others' && !hasOutstandingRequests(updated)) {
    return { ...updated, status: 'submitted' };
  }
  return updated;
}

export function removeRequest(section: SectionState, requestId: string): SectionState {
  if (!(requestId in section.requests)) return section;
  const requests = { ...section.requests };
  delete requests[requestId];
  return { ...section, requests };
}

export function applyLock(section: SectionState, locked: boolean): SectionState {
  return { ...section, locked };
}

export function countSubmitted(application: Application): number {
  return Object.values(application.sections).filter((s) => s.status === 'submitted').length;
}
