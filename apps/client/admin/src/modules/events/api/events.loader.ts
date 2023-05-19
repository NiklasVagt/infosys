import { EventDto } from '@infosys/dtos';
import axios from 'axios';
import { LoaderFunction, redirect } from 'react-router-dom';
import { tokenStore, userState } from '../../common/store/user.store';

export const eventListLoader: LoaderFunction = () =>
  axios
    .get<EventDto[]>('/api/events', {
      headers: {
        Authorization: `Bearer ${tokenStore.token}`,
      },
    })
    .then((response) =>
      response.data.map((event) => ({ ...event, date: new Date(event.date) }))
    )
    .catch((error) => {
      if (error.response.status === 403) throw redirect('/login');
      return error.response.data || { message: error.message };
    });

export const eventItemLoader: LoaderFunction = ({ params }) =>
  axios
    .get<EventDto>(`/api/events/${params.id}`, {
      headers: {
        Authorization: `Bearer ${tokenStore.token}`,
      },
    })
    .then((response) => ({
      ...response.data,
      date: new Date(response.data.date),
    }))
    .catch((error) => error.response.data || { message: error.message });

export const eventCreateLoader: LoaderFunction =
  async (): Promise<EventDto> => {
    const user = await userState.user;

    return {
      id: -1,
      name: '',
      description: '',
      author: user?.username ?? '',
      date: new Date(),
    };
  };
