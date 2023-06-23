import { PersonDto } from '@infosys/dtos';
import axios from 'axios';
import { LoaderFunction } from 'react-router-dom';

export const personListLoader: LoaderFunction = () =>
  axios
    .get<PersonDto[]>('/api/persons')
    .then((response) =>
      response.data.map((person) => ({ ...person, lastName: person.lastName }))
    );
