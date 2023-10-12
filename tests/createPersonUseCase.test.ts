import { describe, expect, mock, spyOn, test } from "bun:test";
import CreatePerson from "../src/core/useCases/Person/createPerson";
import Person from "../src/core/entities/Person";
import PersonRepository from "../src/ports/output/db/adapters/repositories/postgres/personRepository";



describe("Create a new person", () => {

    const mockRepository = mock(() => new PersonRepository());
    const sut = new CreatePerson(mockRepository());

    test("should not create a ṕerson when as know as is empty or white space", () => {

        ["", " ", "     "].forEach((asKnowAsInvalidValue) => {
            expect(async () => {
                const person = { id: "", asKnowAs: asKnowAsInvalidValue, name: "", bornedAt: "" } as Person;
                await sut.Execute(person);
            }).toThrow(new Error("As know as is required."));

        });
    });

    test("Should not create a ṕerson when name is empty or white space", () => {
        ["", " ", "     "].forEach((nameInvalidValue: string) => {
            expect(async () => {
                const person = {
                    id: "",
                    asKnowAs: "asKnowAsInvalidValue",
                    name: nameInvalidValue,
                    bornedAt: "2000-10-10"
                } as Person;
                await sut.Execute(person);
            }).toThrow(new Error("Name is required"));
        });
    })

    test("should throw when as know as grather than 32 characteres", () => {
        const asKnowAsGratherThan32 = "a".repeat(33);
        expect(async () => {
            const person = { id: "", asKnowAs: asKnowAsGratherThan32, name: "rnascimento", bornedAt: "2000-10-10" } as Person;
            await sut.Execute(person);
        }).toThrow(new Error("invalid as know as, lenght should be less than 32."));
    });

    test("as know as should not be registered on db, when it is regeistered", () => {
        expect(async () => {

            const person = { id: "", asKnowAs: "rnascimento", name: "rnascimento", bornedAt: "2000-10-10" } as Person;
            const repository = mockRepository();
            await repository.addPerson(person);

            const sut = new CreatePerson(repository);
            await sut.Execute(person);

        }).toThrow(new Error("this person is registered in the system."));
    });

    test("person borned should not be grather than 100 characteres", () => {
        const name = "r".repeat(101);
        expect(async () => {
            const person = { id: "", asKnowAs: "Renato", name: name, bornedAt: "2000-10-10" } as Person;
            await sut.Execute(person);
        }).toThrow(new Error("invalid name, lenght should be less than 100."));

    });


    test("borned at should trhow a error when bornet at is not valid date", () => {

        ["2010-12-123", "2010-121-12", "20101-12-12", "201A-12-12"]
            .forEach((bornedAt) => {
                expect(async () => {
                    const person = { id: "", asKnowAs: "rnascimento", name: "rnascimento", bornedAt: bornedAt } as Person;
                    await sut.Execute(person);
                }).toThrow(new Error("Borned at is invalid. The valid format is [AAAA-MM-DD]"));

            });
    });

    test("Create a person", async () => {

        const repository = mockRepository();
        spyOn(repository, "addPerson");
        const personToAdd = { id: "", asKnowAs: "rnascimento", name: "rnascimento", bornedAt: "2022-10-10" } as Person;

        const sut = new CreatePerson(repository);

        await sut.Execute(personToAdd);


        expect(repository.addPerson).toHaveBeenCalledTimes(1);

    });


});