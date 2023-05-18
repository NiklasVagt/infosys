import { RequestHandler } from 'express';
import { EventsRepository } from '../services/events.repository';
import { updateEventSchema } from '@infosys/dtos/event';
import { handleHttpError } from '@infosys/node-common';
import { idSchema } from '@infosys/dtos/id';

/** Update a single event by its ID. */
export const updateEvent =
  (events: EventsRepository): RequestHandler<{ id: string }> =>
  async (req, res) => {
    try {
      const id = idSchema.parse(+req.params.id);
      // Check has body
      const eventDto = updateEventSchema.parse(req.body);

      // Get event from db via repository
      const event = await events.updateEvent(id, eventDto);
      // Return found event
      return res.json(event);
    } catch (err) {
      const { code, body } = handleHttpError(err);
      return res.status(code).json(body);
    }
  };
