import { z } from 'zod';

/**
 * @typedef {object} InfosysPerson
 * @property {number} id.required - Person's id
 * @property {string} firstName.required - Person's first name
 * @property {string} lastName.required - Person's last name
 * @property {string} occupation.required - Person occupation
 */

export const personSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1, {
    message: "Person's first name must be at least 1 character long.",
  }),
  lastName: z.string().min(2, {
    message: "Person's last name must be at least 2 characters long.",
  }),
  occupation: z
    .string()
    .min(3, { message: 'Occupation must be at least 3 characters long.' }),
});

/**
 * @typedef {object} CreateInfosysPerson
 * @property {string} lastName.required - Person's last name
 * @property {string} lastName.required - Person's last name
 * @property {string} occupation.required - Person occupation
 */
export const createPersonSchema = personSchema.omit({ id: true });

/**
 * @typedef {object} UpdateInfosysPerson
 * @property {string} firstName - Person's first name
 * @property {string} lastName - Person's last name
 * @property {string} occupation - Person's occupation
 */
export const updatePersonSchema = createPersonSchema.partial();

export type PersonDto = z.infer<typeof personSchema>;
export type CreatePersonDto = z.infer<typeof createPersonSchema>;
export type UpdatePersonDto = z.infer<typeof updatePersonSchema>;
