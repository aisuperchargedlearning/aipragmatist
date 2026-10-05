import type { FieldErrors, FieldValues, Resolver } from 'react-hook-form';
import { z } from 'zod';
import type { RequestState, UploadedDocument } from '../domain/types';

/** One problem with one field. `path` uses dots, for example "references.0.email". */
export interface Issue {
  path: string;
  message: string;
}

/** Facts outside the form that validation needs, such as whether a request was sent. */
export interface ValidationContext {
  requests: Record<string, RequestState>;
}

export type Validator<T> = (values: T, ctx: ValidationContext) => Issue[];

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const requiredText = (message: string) => z.string().trim().min(1, message);

export const requiredChoice = (message: string) => z.string().min(1, message);

export const emailField = (required: string, invalid: string) =>
  z.string().trim().min(1, required).regex(EMAIL_PATTERN, invalid);

export const phoneField = (required: string, invalid: string) =>
  z
    .string()
    .trim()
    .min(1, required)
    .refine((v) => v === '' || v.replace(/\D/g, '').length >= 7, invalid);

export function issuesFor(schema: z.ZodType, values: unknown): Issue[] {
  const result = schema.safeParse(values);
  if (result.success) return [];
  return result.error.issues.map((i) => ({ path: i.path.map(String).join('.'), message: i.message }));
}

export interface DateParts {
  day: string;
  month: string;
  year: string;
}

export const emptyDate = (): DateParts => ({ day: '', month: '', year: '' });

export function isRealDate({ day, month, year }: DateParts): boolean {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);
  if (!Number.isInteger(d) || !Number.isInteger(m) || !Number.isInteger(y)) return false;
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

export function dateValue({ day, month, year }: DateParts): number {
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

export function dateIssues(parts: DateParts | undefined, path: string, missing: string): Issue[] {
  if (!parts?.day || !parts.month || !parts.year) return [{ path, message: missing }];
  if (!isRealDate(parts)) return [{ path, message: "That date doesn't exist. Check the day and month." }];
  return [];
}

export function documentIssue(doc: UploadedDocument | null | undefined, path: string, message: string): Issue[] {
  return doc && doc.pages.length > 0 ? [] : [{ path, message }];
}

/** Adds an issue unless the request has been sent (or already completed). */
export function requestSentIssue(ctx: ValidationContext, requestId: string, path: string, message: string): Issue[] {
  const status = ctx.requests[requestId]?.status ?? 'not_sent';
  return status === 'not_sent' ? [{ path, message }] : [];
}

/** Builds React Hook Form errors from issues. The first issue for a field wins. */
export function toFieldErrors<T extends FieldValues>(issues: Issue[]): FieldErrors<T> {
  const errors: Record<string, unknown> = {};
  for (const { path, message } of issues) {
    const keys = path.split('.');
    let node: Record<string, unknown> = errors;
    let blocked = false;
    keys.forEach((key, index) => {
      if (blocked) return;
      const existing = node[key] as Record<string, unknown> | undefined;
      if (index === keys.length - 1) {
        if (!existing) node[key] = { type: 'validation', message };
        return;
      }
      if (existing && typeof existing.message === 'string') {
        blocked = true;
        return;
      }
      if (!existing) node[key] = {};
      node = node[key] as Record<string, unknown>;
    });
  }
  return errors as FieldErrors<T>;
}

/**
 * React Hook Form resolver that runs a section's validator. Context is read at call time,
 * so request statuses are always current.
 */
export function createResolver<T extends FieldValues>(
  validate: Validator<T>,
  getContext: () => ValidationContext,
): Resolver<T> {
  return async (values) => {
    const issues = validate(values, getContext());
    if (issues.length === 0) return { values, errors: {} };
    return { values: {}, errors: toFieldErrors<T>(issues) };
  };
}

/** Error message at a dotted path, including paths that are not form fields (for example "doctorRequest"). */
export function errorMessage(errors: object, path: string): string | undefined {
  let node: unknown = errors;
  for (const key of path.split('.')) {
    if (!node || typeof node !== 'object') return undefined;
    node = (node as Record<string, unknown>)[key];
  }
  const message = (node as { message?: unknown } | undefined)?.message;
  return typeof message === 'string' ? message : undefined;
}

/** Dotted paths of every field that currently has an error message. */
export function errorPaths(errors: object, prefix = ''): string[] {
  const paths: string[] = [];
  for (const [key, value] of Object.entries(errors)) {
    if (!value || typeof value !== 'object' || key === 'ref') continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof (value as { message?: unknown }).message === 'string') paths.push(path);
    else paths.push(...errorPaths(value as object, path));
  }
  return paths;
}
