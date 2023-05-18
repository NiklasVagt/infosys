import { z } from 'zod';

export const idSchema = z.number({
  description: 'test',
  errorMap: (issue) => ({
    message:
      issue.code === 'invalid_type'
        ? 'id is not a number'
        : issue.message ?? 'Invalid ID',
  }),
});
