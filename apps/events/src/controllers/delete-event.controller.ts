import { RequestHandler } from 'express';
import { EventsRepository } from '../services/events.repository';

/** Delete a single event by its ID. */
export const deleteEvent =
  (events: EventsRepository): RequestHandler<{ id: string }> =>
  (req, res) => {
    try {
      const id = +req.params.id;
      // Check id path param is valid
      if (isNaN(id)) {
        const message = `Id ${id} is not a number.`;
        console.info(message);

        return res.status(400).json({ message });
      }

      // Get event from db via repository
      const eventList = events.deleteEvent(id);
      // Return eventList
      return res.json(eventList);
    } catch (err) {
      console.error(err);
      return res.status(err.code ?? 500).json({ message: err.message });
    }
  };
