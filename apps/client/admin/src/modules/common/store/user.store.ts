import { UserDto } from '@infosys/dtos';
import axios from 'axios';
import { proxy } from 'valtio';
import { derive, subscribeKey } from 'valtio/utils';
import { router } from '../../../app/app.routes';
import { createSearchParams } from 'react-router-dom';

interface TokenStore {
  token: string | null;
}

export const tokenStore = proxy<TokenStore>({
  token: localStorage.getItem('token'),
});

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
            console.error(err);
            return null;
          })
      : null;
  },
});

subscribeKey(userState, 'token', (value) => {
  if (value) {
    localStorage.setItem('token', value);

    const path =
      new URLSearchParams(window.location.search).get('dest') ?? '/users';
    router.navigate(path);
  } else {
    localStorage.removeItem('token');

    const search = createSearchParams({ dest: window.location.pathname });
    router.navigate({ pathname: '/login', search: search.toString() });
  }
});
