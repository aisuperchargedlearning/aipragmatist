import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { COUNTRIES, DAYS, MONTHS, US, US_STATES, birthYearOptions } from '../../content/options';
import { SectionLayout } from '../../components/section/SectionLayout';
import { Card } from '../../components/ui/Card';
import { DateSelectField, SelectField, TextField } from '../../components/ui/fields';
import { useSectionForm } from '../../forms/useSectionForm';
import { identityLabels as L, identityModule } from './schema';

export function IdentitySection() {
  const controller = useSectionForm('identity', identityModule);
  const {
    register,
    control,
    formState: { errors },
  } = controller.form;
  const isUS = useWatch({ control, name: 'country' }) === US;
  const birthYears = useMemo(() => birthYearOptions(), []);

  return (
    <SectionLayout sectionId="identity" controller={controller}>
      <Card title={L.personalCard}>
        <div className="grid-2">
          <TextField label={L.firstName} required autoComplete="given-name" error={errors.firstName?.message} {...register('firstName')} />
          <TextField label={L.lastName} required autoComplete="family-name" error={errors.lastName?.message} {...register('lastName')} />
          <DateSelectField
            name="dob"
            legend={L.dob}
            required
            day={register('dob.day')}
            month={register('dob.month')}
            year={register('dob.year')}
            days={DAYS}
            months={MONTHS}
            years={birthYears}
            error={errors.dob?.message}
          />
          <TextField label={L.preferredName} autoComplete="nickname" {...register('preferredName')} />
        </div>
      </Card>

      <Card title={L.contactCard}>
        <div className="grid-2">
          <TextField
            label={L.email}
            required
            type="email"
            inputMode="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <TextField label={L.phone} required type="tel" autoComplete="tel" error={errors.phone?.message} {...register('phone')} />
          <SelectField
            label={L.country}
            required
            options={COUNTRIES}
            autoComplete="country"
            fieldClassName="span-all"
            error={errors.country?.message}
            {...register('country')}
          />
          <TextField
            label={L.street}
            required
            autoComplete="street-address"
            fieldClassName="span-all"
            error={errors.street?.message}
            {...register('street')}
          />
        </div>
        <div className="grid-address">
          <TextField label={L.city} required autoComplete="address-level2" error={errors.city?.message} {...register('city')} />
          {isUS ? (
            <SelectField
              label={L.state}
              required
              placeholder={L.statePlaceholder}
              options={US_STATES}
              autoComplete="address-level1"
              error={errors.state?.message}
              {...register('state')}
            />
          ) : (
            <TextField label={L.region} autoComplete="address-level1" {...register('region')} />
          )}
          <TextField
            label={isUS ? L.zip : L.postalCode}
            required={isUS}
            autoComplete="postal-code"
            inputMode={isUS ? 'numeric' : undefined}
            error={errors.postalCode?.message}
            {...register('postalCode')}
          />
        </div>
      </Card>
    </SectionLayout>
  );
}
