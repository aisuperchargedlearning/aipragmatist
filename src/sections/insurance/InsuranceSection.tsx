import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { DAYS, MONTHS, YES_NO, yearRange } from '../../content/options';
import { DocumentsCard } from '../../components/documents/DocumentsCard';
import { SectionLayout } from '../../components/section/SectionLayout';
import { Banner } from '../../components/ui/Banner';
import { Card } from '../../components/ui/Card';
import { DateSelectField, RadioGroupField, TextField } from '../../components/ui/fields';
import { useSectionForm } from '../../forms/useSectionForm';
import { insuranceLabels as L, insuranceModule } from './schema';

export function InsuranceSection() {
  const controller = useSectionForm('insurance', insuranceModule);
  const {
    register,
    control,
    formState: { errors },
  } = controller.form;
  const answer = useWatch({ control, name: 'hasInsurance' });
  const coverageYears = useMemo(() => {
    const year = new Date().getFullYear();
    return yearRange(year - 1, year + 3);
  }, []);

  return (
    <SectionLayout sectionId="insurance" controller={controller}>
      <Card title={L.insuranceCard}>
        <RadioGroupField
          name="hasInsurance"
          legend={L.hasInsurance}
          hint={L.hasInsuranceHint}
          required
          inline
          options={YES_NO}
          registration={register('hasInsurance')}
          error={errors.hasInsurance?.message}
        />

        {answer === 'yes' && (
          <div className="grid-2 conditional-block">
            <TextField label={L.provider} required autoComplete="off" error={errors.provider?.message} {...register('provider')} />
            <TextField label={L.policyNumber} required autoComplete="off" error={errors.policyNumber?.message} {...register('policyNumber')} />
            <DateSelectField
              name="coverageStart"
              legend={L.coverageStart}
              required
              day={register('coverageStart.day')}
              month={register('coverageStart.month')}
              year={register('coverageStart.year')}
              days={DAYS}
              months={MONTHS}
              years={coverageYears}
              error={errors.coverageStart?.message}
            />
            <DateSelectField
              name="coverageEnd"
              legend={L.coverageEnd}
              required
              day={register('coverageEnd.day')}
              month={register('coverageEnd.month')}
              year={register('coverageEnd.year')}
              days={DAYS}
              months={MONTHS}
              years={coverageYears}
              error={errors.coverageEnd?.message}
            />
          </div>
        )}

        {answer === 'no' && (
          <div className="conditional-block">
            <Banner tone="info">{L.noInsuranceNote}</Banner>
          </div>
        )}
      </Card>

      {answer === 'yes' && (
        <DocumentsCard
          title={L.documentsCard}
          description={<p>{L.documentsIntro}</p>}
          control={control}
          documents={[{ name: 'insuranceCard', label: L.card, hint: L.cardHint, required: false, multiPage: true }]}
        />
      )}
    </SectionLayout>
  );
}
