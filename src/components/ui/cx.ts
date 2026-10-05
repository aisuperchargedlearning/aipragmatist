/** Joins class names, skipping empty values. */
export function cx(...names: Array<string | false | null | undefined>): string {
  return names.filter(Boolean).join(' ');
}

/** Stable element id for a form field path such as "references.0.email". */
export function fieldId(name: string): string {
  return `f-${name.replace(/\./g, '-')}`;
}

export function describedBy(...ids: Array<string | undefined>): string | undefined {
  const joined = ids.filter(Boolean).join(' ');
  return joined || undefined;
}
