import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { Option } from '../../content/options';
import { cx, describedBy, fieldId } from './cx';
import { Alert } from './Icons';

export function RequiredMark() {
  return (
    <span className="required-mark" aria-hidden="true">
      {' '}
      *
    </span>
  );
}

export function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error">
      <Alert size={16} />
      <span>{message}</span>
    </p>
  );
}

interface FieldShellProps {
  id: string;
  label: ReactNode;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function FieldShell({ id, label, required, hint, error, className, children }: FieldShellProps) {
  return (
    <div className={cx('field', className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <RequiredMark />}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function a11yProps(id: string, { required, hint, error }: { required?: boolean; hint?: string; error?: string }) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-required': required || undefined,
    'aria-describedby': describedBy(hint ? `${id}-hint` : undefined, error ? `${id}-error` : undefined),
  };
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  fieldClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { name, label, required, hint, error, fieldClassName, className, type = 'text', ...input },
  ref,
) {
  const id = fieldId(name);
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={fieldClassName}>
      <input
        ref={ref}
        name={name}
        type={type}
        className={cx('input', className)}
        {...a11yProps(id, { required, hint, error })}
        {...input}
      />
    </FieldShell>
  );
});

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  name: string;
  label: string;
  options: readonly Option[];
  placeholder?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  fieldClassName?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { name, label, options, placeholder, required, hint, error, fieldClassName, className, ...select },
  ref,
) {
  const id = fieldId(name);
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={fieldClassName}>
      <select ref={ref} name={name} className={cx('input', 'select', className)} {...a11yProps(id, { required, hint, error })} {...select}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
});

interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  /** Current length, to show a character counter when maxLength is set. */
  count?: number;
  fieldClassName?: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(function TextAreaField(
  { name, label, required, hint, error, count, maxLength, fieldClassName, className, rows = 4, ...textarea },
  ref,
) {
  const id = fieldId(name);
  const counterId = maxLength ? `${id}-count` : undefined;
  const props = a11yProps(id, { required, hint, error });
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={fieldClassName}>
      <textarea
        ref={ref}
        name={name}
        rows={rows}
        maxLength={maxLength}
        className={cx('input', 'textarea', className)}
        {...props}
        aria-describedby={describedBy(props['aria-describedby'], counterId)}
        {...textarea}
      />
      {maxLength !== undefined && (
        <p id={counterId} className="char-count">
          {count ?? 0} of {maxLength} characters
        </p>
      )}
    </FieldShell>
  );
});

interface ChoiceGroupProps {
  name: string;
  legend: string;
  options: readonly Option[];
  registration: UseFormRegisterReturn;
  required?: boolean;
  hint?: string;
  error?: string;
  inline?: boolean;
  className?: string;
}

/** Yes/No style questions: one choice from a short list. */
export function RadioGroupField({ name, legend, options, registration, required, hint, error, inline, className }: ChoiceGroupProps) {
  const id = fieldId(name);
  return (
    <fieldset
      className={cx('field', 'choice-group', className)}
      role="radiogroup"
      aria-invalid={error ? true : undefined}
      aria-required={required || undefined}
      aria-describedby={describedBy(hint ? `${id}-hint` : undefined, error ? `${id}-error` : undefined)}
    >
      <legend className="field-label">
        {legend}
        {required && <RequiredMark />}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      <div className={cx('choices', inline && 'choices--inline')}>
        {options.map((o) => (
          <label key={o.value} className="choice">
            <input type="radio" value={o.value} {...registration} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}

/** Pick any number from a list. */
export function CheckboxGroupField({ name, legend, options, registration, hint, error, className }: ChoiceGroupProps) {
  const id = fieldId(name);
  return (
    <fieldset
      className={cx('field', 'choice-group', className)}
      aria-describedby={describedBy(hint ? `${id}-hint` : undefined, error ? `${id}-error` : undefined)}
    >
      <legend className="field-label">{legend}</legend>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      <div className="choices choices--grid">
        {options.map((o) => (
          <label key={o.value} className="choice">
            <input type="checkbox" value={o.value} {...registration} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}

interface DateSelectFieldProps {
  name: string;
  legend: string;
  day: UseFormRegisterReturn;
  month: UseFormRegisterReturn;
  year: UseFormRegisterReturn;
  days: readonly Option[];
  months: readonly Option[];
  years: readonly Option[];
  required?: boolean;
  error?: string;
  className?: string;
}

/** Day, month (by name) and year dropdowns. Used instead of a typed MM/DD/YYYY field. */
export function DateSelectField({ name, legend, day, month, year, days, months, years, required, error, className }: DateSelectFieldProps) {
  const id = fieldId(name);
  const errorId = error ? `${id}-error` : undefined;
  const parts = [
    { key: 'day', label: 'Day', placeholder: 'Day', registration: day, options: days },
    { key: 'month', label: 'Month', placeholder: 'Select month', registration: month, options: months },
    { key: 'year', label: 'Year', placeholder: 'Year', registration: year, options: years },
  ];
  return (
    <fieldset className={cx('field', 'date-field', className)}>
      <legend className="field-label">
        {legend}
        {required && <RequiredMark />}
      </legend>
      <div className="date-grid">
        {parts.map((p) => (
          <div key={p.key} className="date-part">
            <label htmlFor={`${id}-${p.key}`} className="visually-hidden">
              {`${legend}: ${p.label}`}
            </label>
            <select
              id={`${id}-${p.key}`}
              className="input select"
              aria-invalid={error ? true : undefined}
              aria-required={required || undefined}
              aria-describedby={errorId}
              {...p.registration}
            >
              <option value="">{p.placeholder}</option>
              {p.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
