import { InfosysEvent, PrismaClient } from '@infosys/events-prisma';
import { handlePrismaError } from '@infosys/node-common';

/**
 * Repository to interact with events database.
 *
 * This is an abstraction over the DB. Ideally when we switch the underlying databse, we only
 * need to adjust his implementation and not the usage within our routers/controllers.
 */
export class EventsRepository {
  private get events() {
    return this.prisma.infosysEvent;
  }

  /**
   * Provide DB via dependency injection to de-couple the database instance from this repository.
   * Useful for testing since you can provide your own simple mock DB in a test and the real one
   * in production.
   */
  constructor(private prisma: PrismaClient) {}

  /** Check if an event with ID exists in database. */
  async hasEvent(id: InfosysEvent['id']): Promise<boolean> {
    const count = await this.events.count({ where: { id } });
    return count > 0;
  }

  /** Get a single event by ID. */
  getEvent(id: InfosysEvent['id']): Promise<InfosysEvent | null> {
    return this.events
      .findUniqueOrThrow({ where: { id } })
      .catch(handlePrismaError(id));
  }

  /** Get the list of all events. */
  getEvents(): Promise<InfosysEvent[]> {
    return this.events.findMany().catch(handlePrismaError());
  }

  /** Create a new event with unique ID and insirt into DB. */
  createEvent(eventDto: Omit<InfosysEvent, 'id'>): Promise<InfosysEvent> {
    return this.events.create({ data: eventDto }).catch(handlePrismaError());
  }

  /** Partially update an event by ID. */
  updateEvent(
    id: InfosysEvent['id'],
    eventDto: Partial<InfosysEvent>
  ): Promise<InfosysEvent> {
    return this.events
      .update({ where: { id }, data: eventDto })
      .catch(handlePrismaError(id));
  }

  /** Delete an event from the database. */
  async deleteEvent(id: InfosysEvent['id']): Promise<InfosysEvent[]> {
    await this.events.delete({ where: { id } }).catch(handlePrismaError(id));
    return this.getEvents();
  }
}
