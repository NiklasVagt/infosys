import { RequestHandler } from 'express';
import { PersonsRepository } from '../services/persons.repository';
import { idSchema } from '@infosys/dtos/id';
import { handleHttpError } from '@infosys/node-common';

export const deletePerson =
  (persons: PersonsRepository): RequestHandler<{ id: string }> =>
  async (req, res) => {
    try {
      const id = idSchema.parse(+req.params.id);

      const personList = await persons.deletePerson(id);

      return res.json(personList);
    } catch (err) {
      const { code, body } = handleHttpError(err);
      return res.status(code).json(body);
    }
  };
