import React, { ElementType } from 'react';
import styles from './persons-item.module.scss';
import { PersonDto } from '@infosys/dtos';
import classNames from 'classnames';

export interface PersonItemProps
  extends React.HTMLAttributes<HTMLOrSVGElement> {
  as: ElementType;
  person: PersonDto;
}

export function PersonItem({
  as: Tag = 'div',
  person,
  className,
  ...props
}: PersonItemProps) {
  return (
    <Tag {...props} className={classNames(styles['container'], className)}>
      {/* name */}
      <h3 className={styles['name']}>
        {person.lastName}, {person.firstName}
      </h3>

      {/* occupation */}
      <h3 className={styles['occuptaion']}>{person.occupation}</h3>
    </Tag>
  );
}

export default PersonItem;
