import { UserDto } from '@infosys/dtos';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { proxy, subscribe } from 'valtio';
import { derive } from 'valtio/utils';

interface TokenStore {
  token: string | null;
}

const tokenStore = proxy<TokenStore>({ token: localStorage.getItem('token') });

export const userState = derive({
  token: (get) => get(tokenStore).token,
  user: async (get) => {
    const token = get(tokenStore).token;

    return token
      ? await axios
          .get<UserDto>('/api/verify', {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => res.data)
          .catch((err) => {
            throw err.response.status === 403 ? redirect('/login') : err;
          })
      : null;
  },
});

subscribe(userState, () => {
  if (userState.token) {
    localStorage.setItem('token', userState.token);
  } else {
    localStorage.removeItem('token');
  }
});
