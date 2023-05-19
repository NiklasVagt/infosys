import { EventDto } from '@infosys/dtos';
import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';

export const eventListLoader: LoaderFunction = () =>
  axios
    .get<EventDto[]>('/api/events')
    .then((response) =>
      response.data.map((event) => ({ ...event, date: new Date(event.date) }))
    );
