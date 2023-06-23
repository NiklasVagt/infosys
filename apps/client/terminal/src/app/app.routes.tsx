import { RouteObject, createBrowserRouter } from 'react-router-dom';

import HomePage from '../modules/home/pages/home-page';
import EventsPage from '../modules/events/pages/events-page';
import PersonPage from '../modules/persons/pages/persons-page';
import { eventListLoader } from '../modules/events/api/events.loader';
import App from './app';
import { personListLoader } from '../modules/persons/api/persons.loader';

export const routes: RouteObject[] = [
  {
    path: '',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>,
      },
      {
        path: '/events',
        element: <EventsPage></EventsPage>,
        loader: eventListLoader,
      },
      {
        path: '/locations/persons',
        element: <PersonPage></PersonPage>,
        loader: personListLoader,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
