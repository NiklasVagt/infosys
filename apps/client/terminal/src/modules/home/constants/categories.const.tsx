import { Icon } from '@iconify/react';
import { CategoryItemList } from '../models/category.model';

export const categories: CategoryItemList[] = [
  {
    title: 'Find your way',
    items: [
      {
        title: 'Office',
        icon: <Icon icon="carbon:document-attachment" />,
        href: '/locations/office',
      },
      {
        title: 'Person',
        icon: <Icon icon="carbon:person" />,
        href: '/locations/person',
      },
      {
        title: 'Rooms',
        icon: <Icon icon="carbon:location" />,
        href: '/locations',
      },
    ],
  },
  {
    title: 'Plan your day',
    items: [
      {
        title: 'Events',
        icon: <Icon icon="carbon:calendar" />,
        href: '/events',
      },
    ],
  },
];
