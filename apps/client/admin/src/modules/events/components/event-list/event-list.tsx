import { ErrorDto, isErrorDto, EventDto } from '@infosys/dtos';
import styles from './event-list.module.scss';
import classNames from 'classnames';
import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { Icon } from '@iconify/react';

/* eslint-disable-next-line */
export interface EventListProps extends React.HTMLAttributes<HTMLDivElement> {}

// TODO: Reuse user list component
export function EventList({ className, ...props }: EventListProps) {
  const eventsOrError = useLoaderData() as EventDto[] | ErrorDto;

  return (
    <div {...props} className={classNames(className, 'list-container')}>
      {isErrorDto(eventsOrError) ? (
        <div className="error-message">{eventsOrError.message}</div>
      ) : (
        <ol className={classNames('list')}>
          {eventsOrError.map((event) => (
            <li key={event.id}>
              <NavLink to={`/events/${event.id}`} className="ghost">
                {event.name}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to={`/events/create`}
              className="secondary outline inline-icon"
            >
              <Icon icon="carbon:add"></Icon>
              Add event
            </NavLink>
          </li>
        </ol>
      )}

      <div className={classNames('item')}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default EventList;
