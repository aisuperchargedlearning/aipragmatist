import { z } from 'zod';
import type { UploadedDocument } from '../../domain/types';
import { emailField, issuesFor, requestSentIssue, requiredText, type Validator } from '../../forms/validation';

export const DOCTOR_REQUEST = 'doctor';

export interface MedicalValues {
  conditions: string;
  medications: string;
  dietary: string[];
  dietaryOther: string;
  immunization: UploadedDocument | null;
  doctorName: string;
  doctorEmail: string;
}

export const medicalLabels = {
  healthCard: 'Your health',
  healthIntro: 'This helps us find a host family and school that can support you. Leave blank anything that does not apply.',
  conditions: 'Allergies or medical conditions (optional)',
  conditionsHint: 'For example: asthma, a peanut allergy, or diabetes.',
  medications: 'Current medications (optional)',
  medicationsHint: 'Include the name and how often you take it.',
  dietary: 'Dietary needs (optional)',
  dietaryHint: 'Choose all that apply.',
  dietaryOther: 'Describe your dietary needs',
  documentsCard: 'Immunization record',
  documentsIntro: 'Your record of vaccinations, from your doctor or health office.',
  immunization: 'Immunization record',
  immunizationHint: 'You can add several pages.',
  doctorCard: "Doctor's form",
  doctorIntro: "Your doctor needs to fill in a short health form. We'll email them a secure link.",
  doctorName: 'Doctor name',
  doctorEmail: 'Doctor email',
  send: 'Send form to doctor',
} as const;

export const medicalDefaults: MedicalValues = {
  conditions: '',
  medications: '',
  dietary: [],
  dietaryOther: '',
  immunization: null,
  doctorName: '',
  doctorEmail: '',
};

/** Fields that must be valid before the form can be sent to the doctor. */
export const doctorFields = ['doctorName', 'doctorEmail'] as const;

export const validateMedical: Validator<MedicalValues> = (values, ctx) => {
  const schema = z.object({
    doctorName: requiredText("Enter your doctor's name."),
    doctorEmail: emailField("Enter your doctor's email address.", 'Enter an email address like name@example.com.'),
  });
  return [
    ...issuesFor(schema, values),
    ...requestSentIssue(ctx, DOCTOR_REQUEST, 'doctorRequest', 'Send the form to your doctor before you submit this section.'),
  ];
};

export const medicalModule = { defaults: medicalDefaults, validate: validateMedical };
