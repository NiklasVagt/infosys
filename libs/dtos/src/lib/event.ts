import { z } from 'zod';

export const eventSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  author: z.string(),
  date: z.date().min(new Date(), { message: 'Date must be in the future' }),
});

export const createEventSchema = eventSchema.omit({ id: true });

export const updateEventSchema = createEventSchema.partial();

export type EventDto = z.infer<typeof eventSchema>;
export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
