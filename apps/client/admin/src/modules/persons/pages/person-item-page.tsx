import { ErrorDto, PersonDto, isErrorDto } from '@infosys/dtos';
import styles from './person-item-page.module.scss';
import { useLoaderData } from 'react-router-dom';
import PersonDetails from '../components/person-details/person-details';

/* eslint-disable-next-line */
export interface PersonItemPageProps {}

export function PersonItemPage(props: PersonItemPageProps) {
  const personOrError = useLoaderData() as PersonDto | ErrorDto;

  return (
    <div className={styles['container']}>
      {isErrorDto(personOrError) ? (
        <div className="error-message">{personOrError.message}</div>
      ) : (
        <PersonDetails
          key={personOrError.id}
          {...personOrError}
        ></PersonDetails>
      )}
    </div>
  );
}

export default PersonItemPage;
