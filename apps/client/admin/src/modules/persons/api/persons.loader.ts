import axios from 'axios';
import { LoaderFunction, redirect } from 'react-router-dom';
import { tokenStore } from '../../common/store/user.store';

export const personListLoader: LoaderFunction = () =>
  axios
    .get('/api/persons', {
      headers: {
        Authorization: `Bearer ${tokenStore.token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status === 403) throw redirect('/login');
      return error.response.data || { message: error.message };
    });

export const personItemLoader: LoaderFunction = ({ params }) =>
  axios
    .get(`/api/persons/${params.id}`, {
      headers: {
        Authorization: `Bearer ${tokenStore.token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error.response.data || { message: error.message });

export const personCreateLoader: LoaderFunction = () => ({
  id: '-1',
  firstName: '',
  lastName: '',
  occupation: '',
});
