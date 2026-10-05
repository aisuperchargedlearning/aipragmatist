import { z } from 'zod';
import { US } from '../../content/options';
import {
  dateIssues,
  emailField,
  emptyDate,
  issuesFor,
  phoneField,
  requiredChoice,
  requiredText,
  type DateParts,
  type Validator,
} from '../../forms/validation';

export interface IdentityValues {
  firstName: string;
  lastName: string;
  dob: DateParts;
  preferredName: string;
  email: string;
  phone: string;
  country: string;
  street: string;
  city: string;
  state: string;
  region: string;
  postalCode: string;
}

export const identityLabels = {
  personalCard: 'Personal information',
  contactCard: 'Contact information',
  firstName: 'First name',
  lastName: 'Last name',
  dob: 'Date of birth',
  preferredName: 'Preferred name (optional)',
  email: 'Email address',
  phone: 'Phone number',
  country: 'Country',
  street: 'Street address',
  city: 'City',
  state: 'State',
  statePlaceholder: 'Select state',
  zip: 'ZIP code',
  region: 'Region / Province',
  postalCode: 'Postal code',
} as const;

export const identityDefaults: IdentityValues = {
  firstName: '',
  lastName: '',
  dob: emptyDate(),
  preferredName: '',
  email: '',
  phone: '',
  country: US,
  street: '',
  city: '',
  state: '',
  region: '',
  postalCode: '',
};

/** Demo values shown in the approved design. Never real student data. */
export const identityDemoValues: IdentityValues = {
  ...identityDefaults,
  firstName: 'Emma',
  lastName: 'Thompson',
  email: 'emma@example.com',
  phone: '(206) 555-0148',
};

export const validateIdentity: Validator<IdentityValues> = (values) => {
  const isUS = values.country === US;
  const schema = z.object({
    firstName: requiredText('Enter your first name.'),
    lastName: requiredText('Enter your last name.'),
    email: emailField('Enter your email address.', 'Enter an email address like name@example.com.'),
    phone: phoneField('Enter your phone number.', 'Enter a phone number with at least 7 digits.'),
    country: requiredChoice('Choose your country.'),
    street: requiredText('Enter your street address.'),
    city: requiredText('Enter your city.'),
    state: isUS ? requiredChoice('Choose your state.') : z.string(),
    postalCode: isUS
      ? z.string().trim().min(1, 'Enter your ZIP code.').regex(/^\d{5}(-\d{4})?$/, 'Enter a 5-digit ZIP code.')
      : z.string(),
  });
  return [...dateIssues(values.dob, 'dob', 'Choose your date of birth.'), ...issuesFor(schema, values)];
};

export const identityModule = { defaults: identityDefaults, validate: validateIdentity };
