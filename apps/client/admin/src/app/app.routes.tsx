import { RouteObject, createBrowserRouter } from 'react-router-dom';
import UserListPage from '../modules/users/pages/user-list-page';
import LoginPage from '../modules/login/pages/login-page';
import UserItemPage from '../modules/users/pages/user-item-page';
import {
  userCreateLoader,
  userItemLoader,
  userListLoader,
} from '../modules/users/api/user.loader';
import App from './app';
import EventItemPage from '../modules/events/pages/event-item-page';
import EventListPage from '../modules/events/pages/event-list-page';
import {
  eventCreateLoader,
  eventItemLoader,
  eventListLoader,
} from '../modules/events/api/events.loader';
import ErrorState from '../modules/common/components/error-state/error-state';
import {
  personListLoader,
  personCreateLoader,
  personItemLoader,
} from '../modules/persons/api/persons.loader';
import PersonItemPage from '../modules/persons/pages/person-item-page';
import PersonListPage from '../modules/persons/pages/person-list-page';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorState />,
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
        element: <PersonListPage></PersonListPage>,
        loader: personListLoader,
        children: [
          {
            path: 'create',
            element: <PersonItemPage></PersonItemPage>,
            loader: personCreateLoader,
          },
          {
            path: ':id',
            element: <PersonItemPage></PersonItemPage>,
            loader: personItemLoader,
          },
        ],
      },
      {
        path: '/events',
        element: <EventListPage></EventListPage>,
        loader: eventListLoader,
        children: [
          {
            path: 'create',
            element: <EventItemPage></EventItemPage>,
            loader: eventCreateLoader,
          },
          {
            path: ':id',
            element: <EventItemPage></EventItemPage>,
            loader: eventItemLoader,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
