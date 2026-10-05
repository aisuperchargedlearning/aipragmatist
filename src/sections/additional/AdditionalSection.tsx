import { useWatch } from 'react-hook-form';
import { GUARDIAN_RELATIONSHIPS } from '../../content/options';
import { strings } from '../../content/strings';
import { InviteCard } from '../../components/InviteCard';
import { SectionLayout } from '../../components/section/SectionLayout';
import { Card } from '../../components/ui/Card';
import { SelectField, TextAreaField, TextField } from '../../components/ui/fields';
import { useSectionForm } from '../../forms/useSectionForm';
import { errorMessage } from '../../forms/validation';
import { useApplication } from '../../state/ApplicationProvider';
import { ANYTHING_ELSE_MAX, CONSENT_REQUEST, additionalLabels as L, additionalModule, guardianFields } from './schema';

export function AdditionalSection() {
  const controller = useSectionForm('additional', additionalModule);
  const { setRequestStatus } = useApplication();
  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = controller.form;
  const anythingElse = useWatch({ control, name: 'anythingElse' }) ?? '';
  const request = controller.requests[CONSENT_REQUEST] ?? { status: 'not_sent' as const };

  return (
    <SectionLayout sectionId="additional" controller={controller}>
      <InviteCard
        title={L.guardianCard}
        description={<p>{L.guardianIntro}</p>}
        request={request}
        completedLabel={strings.request.signed}
        sendLabel={L.send}
        errorPath="consentRequest"
        error={errorMessage(errors, 'consentRequest')}
        onValidate={() => trigger([...guardianFields])}
        onSend={() => {
          setRequestStatus('additional', CONSENT_REQUEST, 'sent', getValues('guardianEmail').trim());
          controller.clearError('consentRequest');
        }}
        onChangeDetails={() => setRequestStatus('additional', CONSENT_REQUEST, 'not_sent')}
      >
        <div className="grid-2">
          <TextField label={L.guardianName} required autoComplete="off" error={errors.guardianName?.message} {...register('guardianName')} />
          <SelectField
            label={L.guardianRelationship}
            required
            placeholder="Select one"
            options={GUARDIAN_RELATIONSHIPS}
            error={errors.guardianRelationship?.message}
            {...register('guardianRelationship')}
          />
          <TextField
            label={L.guardianEmail}
            required
            type="email"
            inputMode="email"
            autoComplete="off"
            error={errors.guardianEmail?.message}
            {...register('guardianEmail')}
          />
          <TextField label={L.guardianPhone} required type="tel" autoComplete="off" error={errors.guardianPhone?.message} {...register('guardianPhone')} />
          <TextField label={L.guardianLanguage} hint={L.guardianLanguageHint} autoComplete="off" {...register('guardianLanguage')} />
        </div>
      </InviteCard>

      <Card title={L.aboutCard}>
        <div className="stack">
          <TextAreaField label={L.interests} hint={L.interestsHint} rows={3} {...register('interests')} />
          <TextAreaField
            label={L.anythingElse}
            rows={5}
            maxLength={ANYTHING_ELSE_MAX}
            count={anythingElse.length}
            error={errors.anythingElse?.message}
            {...register('anythingElse')}
          />
        </div>
      </Card>
    </SectionLayout>
  );
}
