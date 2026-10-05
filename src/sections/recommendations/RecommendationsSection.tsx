import { useFieldArray } from 'react-hook-form';
import { strings } from '../../content/strings';
import { InviteCard } from '../../components/InviteCard';
import { SectionLayout } from '../../components/section/SectionLayout';
import { Button } from '../../components/ui/Button';
import { TextField } from '../../components/ui/fields';
import { useSectionForm } from '../../forms/useSectionForm';
import { errorMessage } from '../../forms/validation';
import { useApplication } from '../../state/ApplicationProvider';
import {
  MAX_REFERENCES,
  newReference,
  recommendationsLabels as L,
  recommendationsModule,
  referenceRequestId,
} from './schema';

export function RecommendationsSection() {
  const controller = useSectionForm('recommendations', recommendationsModule);
  const { setRequestStatus, removeRequest } = useApplication();
  const {
    register,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = controller.form;
  const { fields, append, remove } = useFieldArray({ control, name: 'references' });

  return (
    <SectionLayout sectionId="recommendations" controller={controller}>
      <p className="section-intro">{L.intro}</p>

      {fields.map((field, index) => {
        const requestId = referenceRequestId(field.refId);
        const request = controller.requests[requestId] ?? { status: 'not_sent' as const };
        const base = `references.${index}` as const;
        return (
          <InviteCard
            key={field.id}
            title={L.card(index + 1)}
            description={<p>{L.cardIntro}</p>}
            request={request}
            completedLabel={strings.request.completed}
            sendLabel={L.send}
            errorPath={`${base}.request`}
            error={errorMessage(errors, `${base}.request`)}
            onValidate={() => trigger([`${base}.name`, `${base}.email`])}
            onSend={() => {
              setRequestStatus('recommendations', requestId, 'sent', getValues(`${base}.email`).trim());
              controller.clearError(`${base}.request`);
            }}
            onChangeDetails={() => setRequestStatus('recommendations', requestId, 'not_sent')}
            extraActions={
              index > 0 && request.status === 'not_sent' ? (
                <button
                  type="button"
                  className="link-button link-button--muted"
                  onClick={() => {
                    removeRequest('recommendations', requestId);
                    remove(index);
                  }}
                >
                  {L.remove}
                </button>
              ) : null
            }
          >
            <div className="grid-2">
              <TextField
                label={L.name}
                required
                autoComplete="off"
                error={errorMessage(errors, `${base}.name`)}
                {...register(`${base}.name`)}
              />
              <TextField
                label={L.email}
                required
                type="email"
                inputMode="email"
                autoComplete="off"
                error={errorMessage(errors, `${base}.email`)}
                {...register(`${base}.email`)}
              />
              <TextField label={L.role} hint={L.roleHint} fieldClassName="span-all" autoComplete="off" {...register(`${base}.role`)} />
            </div>
          </InviteCard>
        );
      })}

      {fields.length < MAX_REFERENCES && (
        <div className="add-row">
          <Button onClick={() => append(newReference(`ref-${Date.now()}`))}>{L.add}</Button>
        </div>
      )}
    </SectionLayout>
  );
}
