import { RequestHandler } from 'express';
import { EventsRepository } from '../services/events.repository';
import { idSchema } from '@infosys/dtos/id';
import { handleHttpError } from '@infosys/node-common';

/** Get the list of all events. */
export const readEventList =
  (events: EventsRepository): RequestHandler =>
  async (req, res) => {
    const eventList = await events.getEvents();
    return res.json(eventList);
  };

/** Get a single event by its ID. */
export const readEvent =
  (events: EventsRepository): RequestHandler<{ id: string }> =>
  async (req, res) => {
    try {
      const id = idSchema.parse(+req.params.id);

      // Get event from db via repository
      const event = await events.getEvent(id);

      // Return found event
      return res.json(event);
    } catch (err) {
      const { code, body } = handleHttpError(err);
      return res.status(code).json(body);
    }
  };
