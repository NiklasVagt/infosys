import { RouteObject } from 'react-router-dom';
import UserListPage from '../modules/users/pages/user-list-page';
import LoginPage from '../modules/login/pages/login-page';
import UserItemPage from '../modules/users/pages/user-item-page';
import {
  userCreateLoader,
  userItemLoader,
  userListLoader,
} from '../modules/users/api/user.loader';
import App from './app';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/users',
        element: <UserListPage></UserListPage>,
        loader: userListLoader,
        children: [
          {
            path: 'create',
            element: <UserItemPage></UserItemPage>,
            loader: userCreateLoader,
          },
          {
            path: ':id',
            element: <UserItemPage></UserItemPage>,
            loader: userItemLoader,
          },
        ],
      },
      {
        path: '/locations',
        element: <div>Locations</div>,
      },
      {
        path: '/persons',
        element: <div>Persons</div>,
      },
      {
        path: '/events',
        element: <div>Events</div>,
      },
    ],
  },
];
