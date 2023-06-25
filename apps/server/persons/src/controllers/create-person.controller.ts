import { RequestHandler } from 'express';
import { PersonsRepository } from '../services/persons.repository';
import { createPersonSchema } from '@infosys/dtos';
import { handleHttpError } from '@infosys/node-common';

export const createPerson =
  (persons: PersonsRepository): RequestHandler =>
  async (req, res) => {
    try {
      const personDto = createPersonSchema.parse(req.body);

      const person = await persons.createPersons(personDto);

      return res.status(201).json(person);
    } catch (err) {
      const { code, body } = handleHttpError(err);
      return res.status(code).json(body);
    }
  };
