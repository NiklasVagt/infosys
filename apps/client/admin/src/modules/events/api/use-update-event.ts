import { ErrorDto, EventDto, UpdateEventDto } from '@infosys/dtos';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../common/store/user.store';

export function useUpdateEvent() {
  const [event, setEvent] = useState<EventDto | null>(null);
  const [error, setError] = useState<string | null>();

  const execute = async (id: EventDto['id'], eventDto: UpdateEventDto) => {
    setError(null);

    try {
      const res = await axios.patch<EventDto>(`/api/events/${id}`, eventDto, {
        headers: { Authorization: `Bearer ${tokenStore.token}` },
      });
      setEvent(res.data);

      return res.data;
    } catch (err) {
      const error = err as AxiosError<ErrorDto>;
      const message = error.response?.data?.message ?? error.message;

      setError(message);
    }
  };

  return [event, error, execute] as const;
}
