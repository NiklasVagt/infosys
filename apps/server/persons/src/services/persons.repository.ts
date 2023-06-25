import { InfosysPerson, PrismaClient } from '@infosys/persons-prisma';
import { handlePrismaError } from '@infosys/node-common';

export class PersonsRepository {
  private get persons() {
    return this.prisma.infosysPerson;
  }

  constructor(private prisma: PrismaClient) {}

  /** Check if a person with ID exists in database. */
  async hasPerson(id: InfosysPerson['id']): Promise<boolean> {
    const count = await this.persons.count({ where: { id } });
    return count > 0;
  }

  /** A single person by ID. */
  getPerson(id: InfosysPerson['id']): Promise<InfosysPerson | null> {
    return this.persons
      .findUniqueOrThrow({ where: { id } })
      .catch(handlePrismaError(id));
  }

  /** List of all persons. */
  getPersons(): Promise<InfosysPerson[]> {
    return this.persons.findMany().catch(handlePrismaError());
  }

  /** Create a new person with unique ID and insirt into DB. */
  createPersons(personDto: Omit<InfosysPerson, 'id'>): Promise<InfosysPerson> {
    return this.persons.create({ data: personDto }).catch(handlePrismaError());
  }

  /** Partially update a person by ID. */
  updatePerson(
    id: InfosysPerson['id'],
    personDto: Partial<InfosysPerson>
  ): Promise<InfosysPerson> {
    return this.persons
      .update({ where: { id }, data: personDto })
      .catch(handlePrismaError(id));
  }

  /** Remove an person from the database. */
  async deletePerson(id: InfosysPerson['id']): Promise<InfosysPerson[]> {
    await this.persons.delete({ where: { id } }).catch(handlePrismaError(id));
    return this.getPersons();
  }
}
