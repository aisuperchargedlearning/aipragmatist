import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { ENGLISH_PROFICIENCY, ENGLISH_TESTS, GRADE_LEVELS, yearRange } from '../../content/options';
import { DocumentsCard, type DocumentSpec } from '../../components/documents/DocumentsCard';
import { SectionLayout } from '../../components/section/SectionLayout';
import { Card } from '../../components/ui/Card';
import { SelectField, TextField } from '../../components/ui/fields';
import { useSectionForm } from '../../forms/useSectionForm';
import { schoolLabels as L, schoolModule, type SchoolValues } from './schema';

export function SchoolSection() {
  const controller = useSectionForm('school', schoolModule);
  const {
    register,
    control,
    formState: { errors },
  } = controller.form;
  const tookTest = useWatch({ control, name: 'englishProficiency' }) === 'test';
  const graduationYears = useMemo(() => {
    const year = new Date().getFullYear();
    return yearRange(year, year + 5);
  }, []);

  const documents: DocumentSpec<SchoolValues>[] = [
    { name: 'transcript', label: L.transcript, hint: L.transcriptHint, required: true, multiPage: true },
    ...(tookTest
      ? [{ name: 'englishResults' as const, label: L.englishResults, hint: L.englishResultsHint, required: true, multiPage: true }]
      : []),
  ];

  return (
    <SectionLayout sectionId="school" controller={controller}>
      <Card title={L.schoolCard}>
        <div className="grid-2">
          <TextField label={L.schoolName} required autoComplete="organization" error={errors.schoolName?.message} {...register('schoolName')} />
          <TextField
            label={L.schoolLocation}
            required
            hint={L.schoolLocationHint}
            error={errors.schoolLocation?.message}
            {...register('schoolLocation')}
          />
          <SelectField
            label={L.gradeLevel}
            required
            placeholder="Select grade"
            options={GRADE_LEVELS}
            error={errors.gradeLevel?.message}
            {...register('gradeLevel')}
          />
          <SelectField
            label={L.graduationYear}
            required
            placeholder="Select year"
            options={graduationYears}
            error={errors.graduationYear?.message}
            {...register('graduationYear')}
          />
        </div>
      </Card>

      <Card title={L.englishCard}>
        <div className="grid-2">
          <SelectField
            label={L.englishProficiency}
            required
            placeholder="Select one"
            options={ENGLISH_PROFICIENCY}
            fieldClassName="span-all"
            error={errors.englishProficiency?.message}
            {...register('englishProficiency')}
          />
          {tookTest && (
            <>
              <SelectField
                label={L.testName}
                required
                placeholder="Select test"
                options={ENGLISH_TESTS}
                error={errors.testName?.message}
                {...register('testName')}
              />
              <TextField label={L.testScore} required hint={L.testScoreHint} error={errors.testScore?.message} {...register('testScore')} />
            </>
          )}
        </div>
      </Card>

      <DocumentsCard title={L.documentsCard} description={<p>{L.documentsIntro}</p>} control={control} documents={documents} />
    </SectionLayout>
  );
}
