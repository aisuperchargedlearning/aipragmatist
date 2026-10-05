import type { UploadedDocument } from '../../domain/types';
import {
  dateIssues,
  dateValue,
  emptyDate,
  isRealDate,
  type DateParts,
  type Issue,
  type Validator,
} from '../../forms/validation';

export interface InsuranceValues {
  hasInsurance: '' | 'yes' | 'no';
  provider: string;
  policyNumber: string;
  coverageStart: DateParts;
  coverageEnd: DateParts;
  insuranceCard: UploadedDocument | null;
}

export const insuranceLabels = {
  insuranceCard: 'Health insurance',
  hasInsurance: 'Do you have your own health insurance?',
  hasInsuranceHint: 'It must cover you while you live in the United States.',
  provider: 'Insurance provider',
  policyNumber: 'Policy number',
  coverageStart: 'Coverage starts',
  coverageEnd: 'Coverage ends',
  documentsCard: 'Insurance card',
  documentsIntro: 'Add a photo of the front and the back of your card.',
  card: 'Insurance card',
  cardHint: 'You can add several pages.',
  // TODO(copy): final wording to be supplied by NWSE.
  noInsuranceNote:
    "That's okay. You don't need your own insurance to apply. Information about student insurance options will appear here.",
} as const;

export const insuranceDefaults: InsuranceValues = {
  hasInsurance: '',
  provider: '',
  policyNumber: '',
  coverageStart: emptyDate(),
  coverageEnd: emptyDate(),
  insuranceCard: null,
};

export const validateInsurance: Validator<InsuranceValues> = (values) => {
  if (!values.hasInsurance) return [{ path: 'hasInsurance', message: 'Choose yes or no.' }];
  if (values.hasInsurance === 'no') return [];

  const issues: Issue[] = [];
  if (!values.provider?.trim()) issues.push({ path: 'provider', message: 'Enter the name of your insurance provider.' });
  if (!values.policyNumber?.trim()) issues.push({ path: 'policyNumber', message: 'Enter your policy number.' });
  issues.push(...dateIssues(values.coverageStart, 'coverageStart', 'Choose the date your coverage starts.'));
  issues.push(...dateIssues(values.coverageEnd, 'coverageEnd', 'Choose the date your coverage ends.'));
  if (
    isRealDate(values.coverageStart) &&
    isRealDate(values.coverageEnd) &&
    dateValue(values.coverageEnd) <= dateValue(values.coverageStart)
  ) {
    issues.push({ path: 'coverageEnd', message: 'The end date must be after the start date.' });
  }
  return issues;
};

export const insuranceModule = { defaults: insuranceDefaults, validate: validateInsurance };
