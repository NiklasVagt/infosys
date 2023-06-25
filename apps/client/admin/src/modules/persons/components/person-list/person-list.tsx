import { Icon } from '@iconify/react';
import { ErrorDto, PersonDto, isErrorDto } from '@infosys/dtos';
import classNames from 'classnames';
import { NavLink, Outlet, useLoaderData } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PersonListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PersonList({ className, ...props }: PersonListProps) {
  const personsOrError = useLoaderData() as PersonDto[] | ErrorDto;

  return (
    <div {...props} className={classNames(className, 'list-container')}>
      {isErrorDto(personsOrError) ? (
        <div className="error-message">{personsOrError.message}</div>
      ) : (
        <ol className={classNames('list')}>
          {personsOrError.map((person) => (
            <li key={person.id}>
              <NavLink to={`/persons/${person.id}`} className="ghost">
                {(person.lastName, person.firstName)}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink
              to={`/persons/create`}
              className="secondary outline inline-icon"
            >
              <Icon icon="carbon:calendar-add"></Icon>
              Add person
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

export default PersonList;
