
import Person from "../../../../../../core/entities/Person";
import IPersonRepository from "../../../IPersonRespository";

export default class PersonRepository implements IPersonRepository {

    private inMemoryCollection: Person[] = [];

    constructor() { }

    async getPerson(id: string): Promise<Person> {
        return this.inMemoryCollection.find(x => x.id == id) || {} as Person;
    }

    async getPersons(seachCriteria: string): Promise<Person[]> {
        return this.inMemoryCollection.filter(p => p.name.match(seachCriteria));
    }

    async getTotalRows(): Promise<number> {
        return this.inMemoryCollection.length;
    }

    async addPerson(person: Person): Promise<Person> {
        this.inMemoryCollection.push(person);
        return person;
    }
}