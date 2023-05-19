import { ErrorDto, EventDto, isErrorDto } from '@infosys/dtos';
import styles from './event-item-page.module.scss';
import { useLoaderData } from 'react-router-dom';
import EventDetails from '../components/event-details/event-details';

/* eslint-disable-next-line */
export interface EventItemPageProps {}

export function EventItemPage(props: EventItemPageProps) {
  const eventOrError = useLoaderData() as EventDto | ErrorDto;

  return (
    <div className={styles['container']}>
      {isErrorDto(eventOrError) ? (
        <div className="error-message">{eventOrError.message}</div>
      ) : (
        <EventDetails key={eventOrError.id} {...eventOrError}></EventDetails>
      )}
    </div>
  );
}

export default EventItemPage;
