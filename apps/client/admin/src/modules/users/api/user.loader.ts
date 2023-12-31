import axios from 'axios';
import { LoaderFunction, redirect } from 'react-router-dom';
import { tokenStore } from '../../common/store/user.store';

export const userListLoader: LoaderFunction = () =>
  axios
    .get('/api/users', {
      headers: {
        Authorization: `Bearer ${tokenStore.token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status === 403) throw redirect('/login');
      return error.response.data || { message: error.message };
    });

export const userItemLoader: LoaderFunction = ({ params }) =>
  axios
    .get(`/api/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${tokenStore.token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error.response.data || { message: error.message });

export const userCreateLoader: LoaderFunction = () => ({
  id: '-1',
  username: '',
});
