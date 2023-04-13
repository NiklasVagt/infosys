import { InfosysEvent } from './models/infosys-event.model';

export const events: InfosysEvent[] = [
  {
    id: 0,
    name: 'my cool event',
    author: 'Ben',
    date: new Date().toISOString(),
    description: 'This is a very cool event.',
  },
  {
    id: 1,
    name: 'my other event',
    author: 'Ben',
    date: new Date().toISOString(),
    description: 'This is a very very cool event.',
  },
];
