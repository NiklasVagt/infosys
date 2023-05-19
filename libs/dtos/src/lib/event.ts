import { z } from 'zod';

/**
 * @typedef {object} InfosysEvent
 * @property {number} id.required - Event ID
 * @property {string} name.required - Event name
 * @property {string} description.required - Event description
 * @property {string} author.required - Event author
 * @property {string} date.required - Date of the event
 */
export const eventSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(3, { message: 'Event name must be at least 3 characters long.' }),
  description: z.string(),
  author: z.string(),
  date: z.coerce
    .date()
    .min(new Date(), { message: 'Date must be in the future' }),
});

/**
 * @typedef {object} CreateInfosysEvent
 * @property {string} name.required - Event name
 * @property {string} description.required - Event description
 * @property {string} author.required - Event author
 * @property {string} date.required - Date of the event
 */
export const createEventSchema = eventSchema.omit({ id: true });

/**
 * @typedef {object} UpdateInfosysEvent
 * @property {string} name - Event name
 * @property {string} description - Event description
 * @property {string} author - Event author
 * @property {string} date - Date of the event
 */
export const updateEventSchema = createEventSchema.partial();

export type EventDto = z.infer<typeof eventSchema>;
export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
