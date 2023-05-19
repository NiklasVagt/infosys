import { useMemo, useState } from 'react';
import { useCreateEvent } from './use-create-event';
import { useUpdateEvent } from './use-update-event';
import { EventDto } from '@infosys/dtos';

export function useUpsertEvent() {
  const [event, setEvent] = useState<EventDto | null>();
  const [error, setError] = useState<string | null>();

  const [newEvent, createError, createEvent] = useCreateEvent();
  const [changedEvent, updateError, updateEvent] = useUpdateEvent();

  useMemo(() => {
    setEvent(newEvent ?? changedEvent);
  }, [newEvent, changedEvent]);

  useMemo(() => {
    setError(createError ?? updateError);
  }, [createError, updateError]);

  return [event, error, createEvent, updateEvent] as const;
}
