import { z } from 'zod';
import {
  emailField,
  issuesFor,
  phoneField,
  requestSentIssue,
  requiredChoice,
  requiredText,
  type Validator,
} from '../../forms/validation';

export const CONSENT_REQUEST = 'consent';
export const ANYTHING_ELSE_MAX = 500;

export interface AdditionalValues {
  guardianName: string;
  guardianRelationship: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianLanguage: string;
  interests: string;
  anythingElse: string;
}

export const additionalLabels = {
  guardianCard: 'Parent or guardian',
  guardianIntro:
    "A parent or guardian needs to agree to your application. We'll email them a secure link to sign.",
  guardianName: 'Full name',
  guardianRelationship: 'Relationship to you',
  guardianEmail: 'Email',
  guardianPhone: 'Phone',
  guardianLanguage: 'Preferred language (optional)',
  guardianLanguageHint: 'We can send the consent form in their language.',
  send: 'Send consent request',
  aboutCard: 'About you',
  interests: 'Interests and hobbies (optional)',
  interestsHint: 'Sports, music, clubs, anything you enjoy.',
  anythingElse: 'Anything else we should know? (optional)',
} as const;

export const additionalDefaults: AdditionalValues = {
  guardianName: '',
  guardianRelationship: '',
  guardianEmail: '',
  guardianPhone: '',
  guardianLanguage: '',
  interests: '',
  anythingElse: '',
};

/** Fields that must be valid before the consent request can be sent. */
export const guardianFields = ['guardianName', 'guardianRelationship', 'guardianEmail', 'guardianPhone'] as const;

export const validateAdditional: Validator<AdditionalValues> = (values, ctx) => {
  const schema = z.object({
    guardianName: requiredText("Enter your parent or guardian's full name."),
    guardianRelationship: requiredChoice('Choose how they are related to you.'),
    guardianEmail: emailField('Enter their email address.', 'Enter an email address like name@example.com.'),
    guardianPhone: phoneField('Enter their phone number.', 'Enter a phone number with at least 7 digits.'),
    anythingElse: z.string().max(ANYTHING_ELSE_MAX, `Keep this to ${ANYTHING_ELSE_MAX} characters or fewer.`),
  });
  return [
    ...issuesFor(schema, values),
    ...requestSentIssue(ctx, CONSENT_REQUEST, 'consentRequest', 'Send the consent request before you submit this section.'),
  ];
};

export const additionalModule = { defaults: additionalDefaults, validate: validateAdditional };
