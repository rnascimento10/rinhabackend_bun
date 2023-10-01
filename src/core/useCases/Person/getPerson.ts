import IPersonRepository from "../../../ports/output/db/IPersonRespository";
import IUseCase from "../../abstractions/IUseCase";
import Person from "../../entities/Person";

export default class GetPerson implements IUseCase<string, Person> {

    constructor(private readonly personRespository : IPersonRepository) { }

    public async Execute(id: string): Promise<Person> {
         return await this.personRespository.getPerson(id);
    }
    
} 
