import { RequestHandler } from 'express';
import { PersonsRepository } from '../services/persons.repository';
import { updatePersonSchema } from '@infosys/dtos';
import { idSchema } from '@infosys/dtos/id';
import { handleHttpError } from '@infosys/node-common';

export const updatePerson =
  (persons: PersonsRepository): RequestHandler<{ id: string }> =>
  async (req, res) => {
    try {
      const id = idSchema.parse(+req.params.id);

      const personDto = updatePersonSchema.parse(req.body);

      const person = await persons.updatePerson(id, personDto);

      return res.json(person);
    } catch (err) {
      const { code, body } = handleHttpError(err);
      return res.status(code).json(body);
    }
  };
