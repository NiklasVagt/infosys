import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ErrorDto, EventDto } from '@infosys/dtos';

export function useDeleteEvent() {
  const [events, setEvents] = useState<EventDto[] | null>(null);
  const [error, setError] = useState<string | null>();

  const execute = async (id: EventDto['id']) => {
    setError(null);

    try {
      const res = await axios.delete<EventDto[]>(`/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents(res.data);

      return res.data;
    } catch (err) {
      const error = err as AxiosError<ErrorDto>;
      const message = error.response?.data?.message ?? error.message;

      setError(message);
    }
  };

  return [events, error, execute] as const;
}
