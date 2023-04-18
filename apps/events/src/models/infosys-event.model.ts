import { InfosysEvent } from '@prisma/client';

/** Assert an object is of type InfosysEvent. */
export const isInfosysEvent = (
  maybeEvent: InfosysEvent | null | undefined
): maybeEvent is InfosysEvent => !!maybeEvent?.name;
