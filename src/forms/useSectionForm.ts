import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, type DefaultValues, type FieldValues, type Path } from 'react-hook-form';
import type { SectionData, SectionId } from '../domain/types';
import { useApplication } from '../state/ApplicationProvider';
import { createResolver, errorPaths, type ValidationContext, type Validator } from './validation';

export interface SectionModule<T extends FieldValues> {
  defaults: T;
  validate: Validator<T>;
}

const FOCUSABLE = 'input:not([type="hidden"]), select, textarea, button';

function focusTarget(el: HTMLElement | null | undefined): HTMLElement | null {
  if (!el) return null;
  return el.matches(FOCUSABLE) ? el : el.querySelector<HTMLElement>(FOCUSABLE);
}

/**
 * Shared behavior for every section form:
 * - autosave on every change (the store debounces the write),
 * - validation only when Submit is clicked, then live as fields are fixed,
 * - focus moves to the first invalid field.
 * Navigation never waits on validation.
 */
export function useSectionForm<T extends FieldValues>(sectionId: SectionId, module: SectionModule<T>) {
  const store = useApplication();
  const storeRef = useRef(store);
  storeRef.current = store;

  const section = store.application.sections[sectionId];
  const ctxRef = useRef<ValidationContext>({ requests: section.requests });
  ctxRef.current = { requests: section.requests };

  const [resolver] = useState(() => createResolver(module.validate, () => ctxRef.current));
  const form = useForm<T>({
    defaultValues: { ...module.defaults, ...(section.data as Partial<T>) } as DefaultValues<T>,
    resolver,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: false,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const statusBannerRef = useRef<HTMLDivElement>(null);
  const [focusToken, setFocusToken] = useState(0);
  const [submitToken, setSubmitToken] = useState(0);
  const [saveLaterShown, setSaveLaterShown] = useState(false);

  // Removes errors for fields that no longer apply, for example State after choosing another country.
  const pruneStaleErrors = useCallback(
    (values: T) => {
      const current = new Set(module.validate(values, ctxRef.current).map((i) => i.path));
      for (const path of errorPaths(form.formState.errors)) {
        if (!current.has(path)) form.clearErrors(path as Path<T>);
      }
    },
    [form, module],
  );

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (!name) return; // Ignore resets. Only real edits count.
      storeRef.current.updateSectionData(sectionId, structuredClone(values) as SectionData);
      setSaveLaterShown(false);
      if (form.formState.isSubmitted) pruneStaleErrors(values as T);
    });
    return () => subscription.unsubscribe();
  }, [form, sectionId, pruneStaleErrors]);

  useEffect(() => {
    if (!focusToken) return;
    const frame = requestAnimationFrame(() => {
      // Buttons (Send, upload tiles) cannot use aria-invalid, so they mark themselves with data-invalid.
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"]');
      focusTarget(first)?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [focusToken]);

  useEffect(() => {
    if (!submitToken) return;
    const frame = requestAnimationFrame(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      statusBannerRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [submitToken]);

  const onSubmit = form.handleSubmit(
    (values) => {
      storeRef.current.submitSection(sectionId, structuredClone(values) as SectionData);
      setSubmitToken((t) => t + 1);
    },
    () => setFocusToken((t) => t + 1),
  );

  const saveLater = useCallback(async () => {
    await storeRef.current.saveNow();
    setSaveLaterShown(true);
  }, []);

  /** Clears a request error (for example after "Send") without waiting for another edit. */
  const clearError = useCallback((path: string) => form.clearErrors(path as Path<T>), [form]);

  const errorCount = errorPaths(form.formState.errors).length;

  return {
    form,
    formRef,
    statusBannerRef,
    section,
    requests: section.requests,
    locked: section.locked,
    onSubmit,
    errorCount,
    showErrorSummary: form.formState.isSubmitted && errorCount > 0,
    saveLater,
    saveLaterShown,
    clearError,
  };
}

/** What the shared section layout needs. The typed form itself stays with each section. */
export type SectionController = Omit<ReturnType<typeof useSectionForm>, 'form'>;
