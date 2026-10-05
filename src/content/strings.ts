/**
 * Shared user-facing copy, kept in one place so it is easy to extract for translation later.
 * Field labels and validation messages live with each section (src/sections/*).
 */
import type { SectionStatus } from '../domain/types';

export const strings = {
  appName: 'Student Application',
  wordmark: 'NWSE',
  skipToForm: 'Skip to the form',

  header: {
    accountMenu: (name: string) => `Account menu for ${name}`,
    resetDemo: 'Reset demo data',
    signOut: 'Sign out (demo)',
    resetConfirm: 'Reset all demo data? This clears everything entered in this browser.',
  },

  sidebar: {
    heading: 'Your application',
    subtext: 'Each section is submitted separately',
    progress: (submitted: number, total: number) => `${submitted} of ${total} sections submitted`,
    navLabel: 'Application sections',
    legendLabel: 'Status key',
    compactBar: (n: number, total: number, title: string) => `Section ${n} of ${total}: ${title}`,
  },

  section: {
    eyebrow: (n: number, total: number) => `Section ${n} of ${total}`,
    requiredNote: 'Required fields',
    documentTitle: (title: string) => `${title} · NWSE Student Application`,
  },

  saved: {
    saving: 'Saving…',
    saved: 'Saved automatically',
  },

  actions: {
    saveLater: 'Save and finish later',
    saveLaterConfirm: 'Your progress is saved. You can sign in any time to continue.',
    submit: 'Submit',
    submitHelper: 'Submit this section when it is ready.',
    submitHelperLocked: 'Our team is reviewing this section.',
    previous: 'Previous section',
    next: 'Next section',
  },

  banners: {
    errorSummary: (count: number) => `Please check ${count} ${count === 1 ? 'field' : 'fields'} below.`,
    submitted: (date: string) =>
      `You submitted this section on ${date}. You can still make changes until our team starts reviewing it.`,
    waiting: (who: string) => `You submitted this section. We're waiting for ${who} to respond.`,
    changedAfterSubmit: 'You changed this section after submitting it. Submit it again when it is ready.',
    locked: 'Our team has started reviewing this section. Contact us if something needs to change.',
  },

  status: {
    not_started: 'Not started',
    in_progress: 'In progress',
    waiting_on_others: 'Waiting on others',
    submitted: 'Submitted',
  } satisfies Record<SectionStatus, string>,

  request: {
    not_sent: 'Not sent',
    sent: 'Sent',
    completed: 'Completed',
    signed: 'Signed',
    sending: 'Sending…',
    changeDetails: 'Change details',
    sentTo: (to: string, date: string) => `Sent to ${to} on ${date}.`,
    completedOn: (label: string, date: string) => `${label} on ${date}.`,
  },

  upload: {
    tile: 'Take a photo or choose a file',
    tileAddPage: 'Add another page',
    tileHint: 'JPEG, PNG, HEIC or PDF, up to 25 MB',
    dropHint: 'You can also drag a file here.',
    checking: 'Checking your document…',
    received: 'Received',
    checkingShort: 'Checking…',
    needed: 'Needed',
    optional: 'Optional',
    pages: (n: number) => `${n} ${n === 1 ? 'page' : 'pages'}`,
    page: (n: number) => `Page ${n}`,
    removePage: (label: string, n: number) => `Remove page ${n} of ${label}`,
    pdf: 'PDF',
    checklistTitle: 'Your documents',
    tooManyPages: (max: number) => `You can add up to ${max} pages.`,
    rejection: {
      unreadable: "We couldn't read that file. Try taking the photo again, in good light.",
      too_small: 'That photo is too small to read. Try again from a little closer.',
      wrong_type: 'Please upload a photo or a PDF.',
    },
  },

  signedOut: {
    title: "You've signed out (demo)",
    body: 'In the real application, you would sign in again with your email address.',
    signIn: 'Sign back in',
  },

  demo: {
    toggle: 'Demo controls',
    title: 'Demo controls',
    note: 'Demo only. Not part of the real application. Never enter real student information.',
    doctor: 'Mark doctor form completed',
    teacher: 'Mark teacher reference completed',
    parent: 'Mark parent consent signed',
    lock: 'Staff begins review of this section',
    unlock: 'Staff ends review (unlock)',
    reset: 'Reset demo data',
    needsSent: 'Send the request first.',
    needsSubmit: 'Submit this section first.',
    done: 'Done.',
  },
} as const;

export function formatDate(iso: string | undefined): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
