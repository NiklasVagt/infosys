import { z } from 'zod';

export const errorSchema = z.object({
  message: z.string(),
});

export const isErrorDto = (data: unknown): data is ErrorDto =>
  !errorSchema.safeParse(data);

export type ErrorDto = z.infer<typeof errorSchema>;
