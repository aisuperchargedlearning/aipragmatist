import { describe, expect, it } from 'vitest';
import { toFieldErrors, errorPaths, type ValidationContext } from '../../forms/validation';
import { identityDefaults, identityDemoValues, validateIdentity, type IdentityValues } from './schema';

const ctx: ValidationContext = { requests: {} };

const complete: IdentityValues = {
  ...identityDemoValues,
  dob: { day: '14', month: '3', year: '2010' },
  street: '100 Pine St',
  city: 'Seattle',
  state: 'WA',
  postalCode: '98101',
};

/** First message per field, the same rule the form uses. */
function messages(values: IdentityValues): Record<string, string> {
  const result: Record<string, string> = {};
  for (const { path, message } of validateIdentity(values, ctx)) result[path] ??= message;
  return result;
}

describe('validateIdentity', () => {
  it('accepts a complete US address', () => {
    expect(validateIdentity(complete, ctx)).toEqual([]);
  });

  it('uses plain-language messages for empty required fields', () => {
    const m = messages(identityDefaults);
    expect(m.firstName).toBe('Enter your first name.');
    expect(m.dob).toBe('Choose your date of birth.');
    expect(m.state).toBe('Choose your state.');
    expect(m.postalCode).toBe('Enter your ZIP code.');
  });

  it('does not need Preferred name', () => {
    expect(messages(complete).preferredName).toBeUndefined();
  });

  it('requires State and ZIP only in the United States', () => {
    const abroad = { ...complete, country: 'DE', state: '', postalCode: '' };
    expect(validateIdentity(abroad, ctx)).toEqual([]);
  });

  it('checks the ZIP format and that the date exists', () => {
    const m = messages({ ...complete, postalCode: '981', dob: { day: '30', month: '2', year: '2010' } });
    expect(m.postalCode).toBe('Enter a 5-digit ZIP code.');
    expect(m.dob).toBe("That date doesn't exist. Check the day and month.");
  });

  it('checks email and phone formats', () => {
    const m = messages({ ...complete, email: 'emma@', phone: '555' });
    expect(m.email).toBe('Enter an email address like name@example.com.');
    expect(m.phone).toBe('Enter a phone number with at least 7 digits.');
  });

  it('builds one error per field for React Hook Form', () => {
    const errors = toFieldErrors(validateIdentity(identityDefaults, ctx));
    const paths = errorPaths(errors);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain('dob');
    expect(paths).not.toContain('preferredName');
  });
});
