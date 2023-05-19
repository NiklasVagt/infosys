import styles from './event-list-page.module.scss';
import EventList from '../components/event-list/event-list';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface EventListPageProps {}

export function EventListPage(props: EventListPageProps) {
  return (
    <div className={classNames('page-container')}>
      <EventList style={{ flex: 1 }}></EventList>
    </div>
  );
}

export default EventListPage;
