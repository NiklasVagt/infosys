import { CreateEventDto, ErrorDto, EventDto } from '@infosys/dtos';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../common/store/user.store';

export function useCreateEvent() {
  const [event, setEvent] = useState<EventDto | null>(null);
  const [error, setError] = useState<string | null>();

  const execute = async (eventDto: CreateEventDto) => {
    setError(null);

    try {
      const res = await axios.post<EventDto>('/api/events', eventDto, {
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
