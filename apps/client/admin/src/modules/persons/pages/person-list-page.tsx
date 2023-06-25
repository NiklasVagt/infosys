import classNames from 'classnames';
import PersonList from '../components/person-list/person-list';

/* eslint-disable-next-line */
export interface PersonListPageProps {}

export function PersonListPage(props: PersonListPageProps) {
  return (
    <div className={classNames('page-container')}>
      <PersonList style={{ flex: 1 }}></PersonList>
    </div>
  );
}

export default PersonListPage;
