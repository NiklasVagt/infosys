import { RequestHandler } from 'express';
import { EventsRepository } from '../services/events.repository';
import { idSchema } from '@infosys/dtos/id';
import { handleHttpError } from '@infosys/node-common';

/** Delete a single event by its ID. */
export const deleteEvent =
  (events: EventsRepository): RequestHandler<{ id: string }> =>
  async (req, res) => {
    try {
      const id = idSchema.parse(+req.params.id);

      // Get event from db via repository
      const eventList = await events.deleteEvent(id);
      // Return eventList
      return res.json(eventList);
    } catch (err) {
      const { code, body } = handleHttpError(err);
      return res.status(code).json(body);
    }
  };
