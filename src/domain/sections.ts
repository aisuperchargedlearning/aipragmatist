import type { SectionId } from './types';

export interface SectionMeta {
  id: SectionId;
  number: number;
  title: string;
  instruction: string;
  /** Who the section waits on after the student submits, if anyone. */
  waitsOn?: string;
}

export const SECTIONS: readonly SectionMeta[] = [
  {
    id: 'identity',
    number: 1,
    title: 'Applicant Identity',
    instruction: 'Enter your details, then submit this section for review.',
  },
  {
    id: 'school',
    number: 2,
    title: 'School & Transcripts',
    instruction: 'Tell us about your school, then add your transcript.',
  },
  {
    id: 'medical',
    number: 3,
    title: 'Medical Information',
    instruction: 'Share your health needs, then send a short form to your doctor.',
    waitsOn: 'your doctor',
  },
  {
    id: 'insurance',
    number: 4,
    title: 'Insurance',
    instruction: 'Tell us about your health insurance.',
  },
  {
    id: 'recommendations',
    number: 5,
    title: 'Recommendations',
    instruction: 'Ask a teacher or school counselor who knows you well to recommend you.',
    waitsOn: 'your references',
  },
  {
    id: 'additional',
    number: 6,
    title: 'Additional Details',
    instruction: 'Add your parent or guardian, then tell us a little more about you.',
    waitsOn: 'your parent or guardian',
  },
];

export const SECTION_COUNT = SECTIONS.length;

export function sectionByNumber(n: number): SectionMeta | undefined {
  return SECTIONS.find((s) => s.number === n);
}

export function sectionById(id: SectionId): SectionMeta {
  const meta = SECTIONS.find((s) => s.id === id);
  if (!meta) throw new Error(`Unknown section: ${id}`);
  return meta;
}
