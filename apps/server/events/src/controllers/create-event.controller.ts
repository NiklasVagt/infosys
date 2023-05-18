import { RequestHandler } from 'express';
import { EventsRepository } from '../services/events.repository';
import { createEventSchema } from '@infosys/dtos/event';
import { handleHttpError } from '@infosys/node-common';

/** Create a new event and insert it into the list of events. */
export const createEvent =
  (events: EventsRepository): RequestHandler =>
  async (req, res) => {
    try {
      // Validate request body
      const eventDto = createEventSchema.parse(req.body);

      // Use repository to create & insert event -> Controller does not care about DB specifics.
      const event = await events.createEvent(eventDto);

      // Return created event
      return res.status(201).json(event);
    } catch (err) {
      const { code, body } = handleHttpError(err);
      return res.status(code).json(body);
    }
  };
