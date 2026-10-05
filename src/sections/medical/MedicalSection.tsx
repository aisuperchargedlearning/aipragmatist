import { useWatch } from 'react-hook-form';
import { DIETARY_NEEDS } from '../../content/options';
import { strings } from '../../content/strings';
import { InviteCard } from '../../components/InviteCard';
import { DocumentsCard } from '../../components/documents/DocumentsCard';
import { SectionLayout } from '../../components/section/SectionLayout';
import { Card } from '../../components/ui/Card';
import { CheckboxGroupField, TextAreaField, TextField } from '../../components/ui/fields';
import { useSectionForm } from '../../forms/useSectionForm';
import { errorMessage } from '../../forms/validation';
import { useApplication } from '../../state/ApplicationProvider';
import { DOCTOR_REQUEST, doctorFields, medicalLabels as L, medicalModule } from './schema';

export function MedicalSection() {
  const controller = useSectionForm('medical', medicalModule);
  const { setRequestStatus } = useApplication();
  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = controller.form;
  const dietary = useWatch({ control, name: 'dietary' }) ?? [];
  const request = controller.requests[DOCTOR_REQUEST] ?? { status: 'not_sent' as const };

  return (
    <SectionLayout sectionId="medical" controller={controller}>
      <Card title={L.healthCard} description={<p>{L.healthIntro}</p>}>
        <div className="grid-2">
          <TextAreaField label={L.conditions} hint={L.conditionsHint} rows={3} {...register('conditions')} />
          <TextAreaField label={L.medications} hint={L.medicationsHint} rows={3} {...register('medications')} />
          <CheckboxGroupField
            name="dietary"
            legend={L.dietary}
            hint={L.dietaryHint}
            options={DIETARY_NEEDS}
            registration={register('dietary')}
            className="span-all"
          />
          {Array.isArray(dietary) && dietary.includes('other') && (
            <TextField label={L.dietaryOther} fieldClassName="span-all" {...register('dietaryOther')} />
          )}
        </div>
      </Card>

      <DocumentsCard
        title={L.documentsCard}
        description={<p>{L.documentsIntro}</p>}
        control={control}
        documents={[{ name: 'immunization', label: L.immunization, hint: L.immunizationHint, required: false, multiPage: true }]}
      />

      <InviteCard
        title={L.doctorCard}
        description={<p>{L.doctorIntro}</p>}
        request={request}
        completedLabel={strings.request.completed}
        sendLabel={L.send}
        errorPath="doctorRequest"
        error={errorMessage(errors, 'doctorRequest')}
        onValidate={() => trigger([...doctorFields])}
        onSend={() => {
          setRequestStatus('medical', DOCTOR_REQUEST, 'sent', getValues('doctorEmail').trim());
          controller.clearError('doctorRequest');
        }}
        onChangeDetails={() => setRequestStatus('medical', DOCTOR_REQUEST, 'not_sent')}
      >
        <div className="grid-2">
          <TextField label={L.doctorName} required autoComplete="off" error={errors.doctorName?.message} {...register('doctorName')} />
          <TextField
            label={L.doctorEmail}
            required
            type="email"
            inputMode="email"
            autoComplete="off"
            error={errors.doctorEmail?.message}
            {...register('doctorEmail')}
          />
        </div>
      </InviteCard>
    </SectionLayout>
  );
}
