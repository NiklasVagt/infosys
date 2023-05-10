import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';

export const userListLoader: LoaderFunction = () =>
  axios
    .get('/api/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error.response.data || { message: error.message };
    });

export const userItemLoader: LoaderFunction = ({ params }) =>
  axios
    .get(`/api/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => error.response.data || { message: error.message });

export const userCreateLoader: LoaderFunction = () => ({
  id: '-1',
  username: '',
});
