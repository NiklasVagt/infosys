import { useLoaderData } from 'react-router-dom';
import styles from './persons-page.module.scss';
import { PersonDto } from '@infosys/dtos';
import PersonItem from '../components/person-item/person-item';

/*eslint-disable-next-line */
export interface PersonsPageProps {}

export function PersonsPage(props: PersonsPageProps) {
  const persons = useLoaderData() as PersonDto[];

  return (
    <div className={styles['container']}>
      <h2>Personal</h2>

      <ul>
        {persons.map((person) => (
          <PersonItem
            as="li"
            key={person.id}
            person={person}
            className={styles['card']}
          ></PersonItem>
        ))}
      </ul>
    </div>
  );
}

export default PersonsPage;
