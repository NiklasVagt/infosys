import { useLoaderData } from 'react-router-dom';
import styles from './events-page.module.scss';
import { EventDto } from '@infosys/dtos';
import EventItem from '../components/event-item/event-item';

/* eslint-disable-next-line */
export interface EventsPageProps {}

export function EventsPage(props: EventsPageProps) {
  const events = useLoaderData() as EventDto[];

  return (
    <div className={styles['container']}>
      <h2>Events</h2>

      <ul>
        {events.map((event) => (
          <EventItem
            as="li"
            key={event.id}
            event={event}
            className={styles['card']}
          ></EventItem>
        ))}
      </ul>
    </div>
  );
}

export default EventsPage;
