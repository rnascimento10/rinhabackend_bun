import { describe, expect, mock, test } from "bun:test";
import CreatePerson from "../src/core/useCases/Person/createPerson";
import PersonRepository from "../src/ports/output/db/adapters/Repositories/postgres/PesonRepository";
import Person from "../src/core/entities/Person";

const mockRepository = mock(() => new PersonRepository());

describe("Create a new person", () => {
    test("should not create a ṕerson when as know as is empty or white space", () => {

        ["", " ", "     "].forEach((asKnowAsInvalidValue) => {

            expect(async () => {
                const uc = new CreatePerson(mockRepository());
                const person = { id: "", asKnowAs: asKnowAsInvalidValue, name: "", bornedAt: "" } as Person;
                await uc.Execute(person);
            }).toThrow(new Error("As know as is required."));

        });
    });

    test("should not create a ṕerson when name is empty or white space", () => {

        ["", " ", "     "].forEach((nameInvalidValue: string) => {
            expect(async () => {
                const uc = new CreatePerson(mockRepository());
                const person = { id: "", asKnowAs: "asKnowAsInvalidValue", name: nameInvalidValue, bornedAt: "2000-10-10" } as Person;
                await uc.Execute(person);
            }).toThrow(new Error("Name is required"));

        });
    })


});