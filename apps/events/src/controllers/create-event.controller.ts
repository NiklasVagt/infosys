import { RequestHandler } from 'express';
import { RequeustWithUser } from '../models/request-with-user.model';
import { isInfosysEvent } from '../models/infosys-event.model';
import { EventsRepository } from '../services/events.repository';

/** Create a new event and insert it into the list of events. */
export const createEvent =
  (events: EventsRepository): RequestHandler =>
  async (req: RequeustWithUser, res) => {
    const eventDto = req.body;

    // Check has body
    if (!req.body)
      return res
        .status(400)
        .json({ message: 'Must provide a valid event body.' });

    // Check is valid event
    if (!isInfosysEvent(eventDto))
      return res.status(400).json({ message: 'Event is not valid.' });

    // Use repository to create & insert event -> Controller does not care about DB specifics.
    const event = await events.createEvent(eventDto);

    // Return created event
    return res.status(201).json(event);
  };
