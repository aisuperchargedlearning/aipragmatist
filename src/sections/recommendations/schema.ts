import { z } from 'zod';
import { emailField, issuesFor, requestSentIssue, requiredText, type Validator } from '../../forms/validation';

export const MAX_REFERENCES = 2;

export interface ReferenceValues {
  /** Stable id that links this reference to its request. */
  refId: string;
  name: string;
  email: string;
  role: string;
}

export interface RecommendationsValues {
  references: ReferenceValues[];
}

export const referenceRequestId = (refId: string) => `reference:${refId}`;

export const recommendationsLabels = {
  intro:
    "Choose a teacher or school counselor who knows you well. We'll email them a short form. You need at least one reference, and you can add a second.",
  card: (n: number) => (n === 1 ? 'Reference 1' : 'Reference 2 (optional)'),
  cardIntro: 'They will receive a secure link and can answer in about 10 minutes.',
  name: 'Name',
  email: 'Email',
  role: 'Subject or role (optional)',
  roleHint: 'For example: English teacher, or school counselor.',
  send: 'Send request',
  add: 'Add a second reference',
  remove: 'Remove this reference',
} as const;

export const newReference = (refId: string): ReferenceValues => ({ refId, name: '', email: '', role: '' });

export const recommendationsDefaults: RecommendationsValues = {
  references: [newReference('ref-1')],
};

const referenceSchema = z.object({
  name: requiredText("Enter your reference's name."),
  email: emailField("Enter your reference's email address.", 'Enter an email address like name@example.com.'),
});

export const validateRecommendations: Validator<RecommendationsValues> = (values, ctx) =>
  (values.references ?? []).flatMap((ref, i) => [
    ...issuesFor(referenceSchema, ref).map((issue) => ({ ...issue, path: `references.${i}.${issue.path}` })),
    ...requestSentIssue(
      ctx,
      referenceRequestId(ref.refId),
      `references.${i}.request`,
      i === 0 ? 'Send this request before you submit this section.' : 'Send this request, or remove this reference.',
    ),
  ]);

export const recommendationsModule = { defaults: recommendationsDefaults, validate: validateRecommendations };
