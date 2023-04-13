import { RequestHandler } from 'express';
import { EventsRepository } from '../services/events.repository';

/** Get the list of all events. */
export const readEventList =
  (events: EventsRepository): RequestHandler =>
  (req, res) =>
    res.json(events.getEvents());

/** Get a single event by its ID. */
export const readEvent =
  (events: EventsRepository): RequestHandler<{ id: string }> =>
  (req, res) => {
    const id = +req.params.id;

    // Check id path param is valid
    if (isNaN(id)) {
      const message = `Id ${id} is not a number.`;
      console.info(message);

      return res.status(400).json({ message });
    }

    // Get event from db via repository
    const event = events.getEvent(id);

    // Check event with id exists in db
    if (!event) {
      const message = `No event with id ${id} found.`;
      console.info(message);

      return res.status(404).json({ message });
    }

    // Return found event
    return res.json(event);
  };
