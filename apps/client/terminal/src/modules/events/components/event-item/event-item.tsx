import React, { ElementType } from 'react';
import styles from './event-item.module.scss';
import { EventDto } from '@infosys/dtos';
import classNames from 'classnames';
import { Icon } from '@iconify/react';

export interface EventItemProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  as: ElementType;
  event: EventDto;
}

export function EventItem({
  as: Tag = 'div',
  event,
  className,
  ...props
}: EventItemProps) {
  const dateFormatter = Intl.DateTimeFormat([...window.navigator.languages], {
    day: 'numeric',
    month: 'short',
  });

  return (
    <Tag {...props} className={classNames(styles['container'], className)}>
      {/* title */}
      <h3 className={styles['title']}>{event.name}</h3>

      {/* Description */}
      <p className={styles['description']}>{event.description}</p>

      {/* Stats */}
      <div className={styles['stats']}>
        {/* Date */}
        <div className={styles['stat']}>
          <Icon icon="carbon:calendar"></Icon>
          <div>{dateFormatter.format(event.date)}</div>
        </div>

        {/* Author */}
        <div className={styles['stat']}>
          <Icon icon="carbon:user"></Icon>
          <div>{event.author}</div>
        </div>
      </div>
    </Tag>
  );
}

export default EventItem;
