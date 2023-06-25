import { Router } from 'express';
import {
  readPerson,
  readPersonList,
} from '../controllers/read-person.controller';
import { createPerson } from '../controllers/create-person.controller';
import { PersonsRepository } from '../services/persons.repository';
import { updatePerson } from '../controllers/update-person.controller';
import { deletePerson } from '../controllers/delete-person.controller';
import { prisma } from '../services/prisma.service';
import { auth } from '../middlewares/auth.middleware';

const personsRepo = new PersonsRepository(prisma);

export const router = Router();

router
  .route('/')
  /**
   * GET /api/persons
   * @summary Get the list of all persons.
   * @tags persons
   * @return {Array.<InfosysPerson>} 200 - Person object
   */
  .get(readPersonList(personsRepo))
  /**
   * POST /api/persons
   * @summary Create a new person.
   * @tags persons
   * @param {CreateInfosysPerson} request.body.required - Person object
   * @return {InfosysPerson} 200 - Person object
   * @return {Error} 403 - Forbidden
   * @return {Error} 405 - Invalid input
   * @security BearerAuth
   */
  .post(auth(), createPerson(personsRepo));

router
  .route('/:id')
  /**
   * GET /api/persons/{id}
   * @summary Get a single person by their ID.
   * @tags persons
   * @param {string} id.path - Person ID
   * @return {InfosysPerson} 200 - Person object
   * @return {Error} 403 - Forbidden
   * @return {Error} 404 - Person not found
   */
  .get(readPerson(personsRepo))
  .all(auth())
  /**
   * PATCH /api/persons/{id}
   * @summary Update a single person by their ID.
   * @tags persons
   * @param {string} id.path - Person ID
   * @param {UpdateInfosysEvent} request.body.required - Person object
   * @return {InfosysEvent} 200 - Person object
   * @return {Error} 400 - Invalid ID supplied
   * @return {Error} 403 - Forbidden
   * @return {Error} 404 - Person not found
   * @return {Error} 405 - Invalid input
   * @security BearerAuth
   */
  .patch(updatePerson(personsRepo))
  /**
   * DELETE /api/persons/{id}
   * @summary Delete a single person by their ID.
   * @tags persons
   * @param {string} id.path - Person ID
   * @return {Array<InfosysEvent>} 200 - Person object
   * @return {Error} 400 - Invalid ID supplied
   * @return {Error} 403 - Forbidden
   * @return {Error} 404 - Person not found
   * @security BearerAuth
   */
  .delete(deletePerson(personsRepo));
