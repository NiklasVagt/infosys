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

router.use(auth());

router
  .route('/')
  /** GET list of events */
  .get(readEventList(eventsRepo))
  /** CREATE a new event and add it to the list of events. */
  .post(createEvent(eventsRepo));

router
  .route('/:id')
  /** GET a single event by id. */
  .get(readEvent(eventsRepo))
  /** PATCH a single event by id. */
  .patch(updateEvent(eventsRepo))
  /** DELETE a single event by id. */
  .delete(deleteEvent(eventsRepo));
