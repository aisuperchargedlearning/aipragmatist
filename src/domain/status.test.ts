import { describe, expect, it } from 'vitest';
import {
  applyEdit,
  applyLock,
  applyRequestStatus,
  applySubmit,
  countSubmitted,
  hasOutstandingRequests,
} from './status';
import type { Application, SectionState } from './types';

const NOW = '2026-10-04T12:00:00.000Z';

function section(overrides: Partial<SectionState> = {}): SectionState {
  return { status: 'not_started', data: {}, locked: false, requests: {}, ...overrides };
}

describe('applyEdit', () => {
  it('moves Not started to In progress', () => {
    expect(applyEdit(section(), { a: 1 }).status).toBe('in_progress');
  });

  it('moves a submitted section back to In progress and keeps the submit date', () => {
    const next = applyEdit(section({ status: 'submitted', submittedAt: NOW }), { a: 2 });
    expect(next.status).toBe('in_progress');
    expect(next.submittedAt).toBe(NOW);
  });

  it('moves Waiting on others back to In progress', () => {
    expect(applyEdit(section({ status: 'waiting_on_others' }), {}).status).toBe('in_progress');
  });

  it('ignores edits once staff review has started', () => {
    const locked = section({ status: 'submitted', locked: true, data: { a: 1 } });
    expect(applyEdit(locked, { a: 2 })).toBe(locked);
  });
});

describe('applySubmit', () => {
  it('goes straight to Submitted when nothing is outstanding', () => {
    const next = applySubmit(section({ status: 'in_progress' }), { a: 1 }, NOW);
    expect(next.status).toBe('submitted');
    expect(next.submittedAt).toBe(NOW);
  });

  it('waits on others when a request is still out', () => {
    const s = section({ status: 'in_progress', requests: { doctor: { status: 'sent' } } });
    expect(applySubmit(s, {}, NOW).status).toBe('waiting_on_others');
  });

  it('is Submitted when every request already came back', () => {
    const s = section({ status: 'in_progress', requests: { doctor: { status: 'completed' } } });
    expect(applySubmit(s, {}, NOW).status).toBe('submitted');
  });
});

describe('applyRequestStatus', () => {
  it('becomes Submitted when the last outstanding request is completed', () => {
    const s = section({
      status: 'waiting_on_others',
      requests: { a: { status: 'sent' }, b: { status: 'sent' } },
    });
    const afterA = applyRequestStatus(s, 'a', 'completed', NOW);
    expect(afterA.status).toBe('waiting_on_others');
    const afterB = applyRequestStatus(afterA, 'b', 'completed', NOW);
    expect(afterB.status).toBe('submitted');
    expect(hasOutstandingRequests(afterB)).toBe(false);
  });

  it('records who a request was sent to', () => {
    const next = applyRequestStatus(section(), 'doctor', 'sent', NOW, 'dr@example.com');
    expect(next.requests.doctor).toEqual({ status: 'sent', sentTo: 'dr@example.com', sentAt: NOW });
  });

  it('treats resetting a request on a submitted section as an edit', () => {
    const s = section({ status: 'waiting_on_others', requests: { doctor: { status: 'sent' } } });
    expect(applyRequestStatus(s, 'doctor', 'not_sent', NOW).status).toBe('in_progress');
  });

  it('still records a completed response after the section is locked', () => {
    const s = section({ status: 'waiting_on_others', locked: true, requests: { c: { status: 'sent' } } });
    expect(applyRequestStatus(s, 'c', 'completed', NOW).status).toBe('submitted');
  });
});

describe('countSubmitted', () => {
  it('counts only fully submitted sections', () => {
    const app: Application = {
      studentId: 's1',
      schemaVersion: 1,
      sections: {
        identity: section({ status: 'submitted' }),
        school: section({ status: 'waiting_on_others' }),
        medical: section({ status: 'in_progress' }),
        insurance: applyLock(section({ status: 'submitted' }), true),
        recommendations: section(),
        additional: section(),
      },
    };
    expect(countSubmitted(app)).toBe(2);
  });
});
