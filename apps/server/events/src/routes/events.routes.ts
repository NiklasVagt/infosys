import { Router } from 'express';
import { readEvent, readEventList } from '../controllers/read-event.controller';
import { createEvent } from '../controllers/create-event.controller';
import { EventsRepository } from '../services/events.repository';
import { updateEvent } from '../controllers/update-event.controller';
import { deleteEvent } from '../controllers/delete-event.controller';
import { prisma } from '../services/prisma.service';
import { auth } from '../middlewares/auth.middleware';

// Create an events repository service and provide the database via dependency injection.
const eventsRepo = new EventsRepository(prisma);

export const router = Router();

router
  .route('/')

  /**
   * GET /api/events
   * @summary Get the list of all events.
   * @tags events
   * @return {Array.<InfosysEvent>} 200 - Event object
   */
  .get(readEventList(eventsRepo))

  /**
   * POST /api/events
   * @summary Create a new event.
   * @tags events
   * @param {CreateInfosysEvent} request.body.required - Event object
   * @return {InfosysEvent} 200 - Event object
   * @return {Error} 403 - Forbidden
   * @return {Error} 405 - Invalid input
   * @security JWT
   */
  .post(auth(), createEvent(eventsRepo));

router
  .route('/:id')

  /**
   * GET /api/events/{id}
   * @summary Get a single event by its ID.
   * @tags events
   * @param {string} id.path - Event ID
   * @return {InfosysEvent} 200 - Event object
   * @return {Error} 400 - Invalid ID supplied
   * @return {Error} 404 - Event not found
   */
  .get(readEvent(eventsRepo))

  .all(auth())

  /**
   * PATCH /api/events/{id}
   * @summary Update a single event by its ID.
   * @tags events
   * @param {string} id.path - Event ID
   * @param {UpdateInfosysEvent} request.body.required - Event object
   * @return {InfosysEvent} 200 - Event object
   * @return {Error} 400 - Invalid ID supplied
   * @return {Error} 403 - Forbidden
   * @return {Error} 404 - Event not found
   * @return {Error} 405 - Invalid input
   * @security JWT
   */
  .patch(updateEvent(eventsRepo))

  /**
   * DELETE /api/events/{id}
   * @summary Delete a single event by its ID.
   * @tags events
   * @param {string} id.path - Event ID
   * @return {Array<InfosysEvent>} 200 - Event object
   * @return {Error} 400 - Invalid ID supplied
   * @return {Error} 403 - Forbidden
   * @return {Error} 404 - Event not found
   * @security JWT
   */
  .delete(deleteEvent(eventsRepo));
