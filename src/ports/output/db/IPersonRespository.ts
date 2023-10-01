import Person from "../../../core/entities/Person";

export default interface IPersonRepository {
    getPerson(id: string): Promise<Person>;
    getPersons(seachCriteria: string): Promise<Person[]>;
    getTotalRows(): Promise<number>;
    addPerson(person: Person): Promise<Person>;
}