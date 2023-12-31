
import IPersonRepository from "../../../ports/output/db/IPersonRespository";
import IUseCase from "../../abstractions/IUseCase";
import Person from "../../entities/Person";
import Guard from "../../guard";


export default class CreatePerson implements
    IUseCase<Person, Person> {

    constructor(private readonly personRespository: IPersonRepository) { }

    public async Execute(person: Person): Promise<Person> {

        if (Guard.isNullOrWhiteSpace(person.asKnowAs)) throw new Error("As know as is required.")
        if (Guard.isNullOrWhiteSpace(person.name)) throw new Error("Name is required");
        if (Guard.greatherThan(person.asKnowAs, 32)) throw new Error("invalid as know as, lenght should be less than 32.");
        if (await this.isNotUnique(person.asKnowAs)) throw new Error("this person is registered in the system.")
        if (Guard.greatherThan(person.name, 100)) throw new Error("invalid name, lenght should be less than 100.");
        if (!new RegExp(/^\d{4}-\d{2}-\d{2}$/).test(person.bornedAt)) throw new Error("Borned at is invalid. The valid format is [AAAA-MM-DD]");

        person.id = crypto.randomUUID();
        return await this.personRespository.addPerson(person)
    }

    isNotUnique = async (asKnowAs: string): Promise<boolean> => {
        const persons = await this.personRespository.getPersons(asKnowAs)
        const counter = persons.length > 0;

        console.log("Persons: "+ persons);

        return counter;
    }
} 
