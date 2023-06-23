import { RouteObject, createBrowserRouter } from 'react-router-dom';

import HomePage from '../modules/home/pages/home-page';
import EventsPage from '../modules/events/pages/events-page';
import { eventListLoader } from '../modules/events/api/events.loader';
import App from './app';

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
        path: '/person',
        element: <PersonPage></PersonPage>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
