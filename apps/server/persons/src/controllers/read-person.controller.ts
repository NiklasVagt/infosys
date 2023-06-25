import { RequestHandler } from 'express';
import { PersonsRepository } from '../services/persons.repository';
import { idSchema } from '@infosys/dtos/id';
import { handleHttpError } from '@infosys/node-common';

export const readPersonList =
  (persons: PersonsRepository): RequestHandler =>
  async (req, res) => {
    const personList = await persons.getPersons();
    return res.json(personList);
  };

export const readPerson =
  (persons: PersonsRepository): RequestHandler<{ id: string }> =>
  async (req, res) => {
    try {
      const id = idSchema.parse(+req.params.id);

      const person = await persons.getPerson(id);

      return res.json(person);
    } catch (err) {
      const { code, body } = handleHttpError(err);
      return res.status(code).json(body);
    }
  };
