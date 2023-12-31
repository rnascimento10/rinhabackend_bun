import { Elysia, t } from "elysia";

import CreatePerson from "../../core/useCases/Person/createPerson";
import { swagger } from '@elysiajs/swagger'
import GetPerson from "../../core/useCases/Person/getPerson";
import PersonRepository from "../output/db/adapters/repositories/postgres/personRepository";

export default class AppDependenciesConfigurations {

    private readonly __app: Elysia;
    private readonly _defaultPorToListen: number = 3000

    constructor() {
        this.__app = new Elysia();
    }

    useOpenApiDocs(): AppDependenciesConfigurations {
        this.__app.use(swagger({
            documentation: {
                tags: [
                    { name: 'Person', description: 'The person resources' },
                ],
                info: {
                    title: `Rinha backend ${process.env.NAME}`,
                    version: '1.0.0'
                }
            }

        }));

        return this;
    }

    addPersonController(): AppDependenciesConfigurations {
        const personRepository = new PersonRepository();
        const createPersonUseCase = new CreatePerson(personRepository);
        const getPersonUseCase = new GetPerson(personRepository);

        this.__app.group("persons", app => app
            .post("", async ({ body, set }) => {
                try {
                    const createdPerson = await createPersonUseCase.Execute(body);
                    set.status = 201;
                    set.headers = { "Location": `pessoa/${createdPerson.id}` }

                } catch (error) {
                    set.status = 422;
                    return error;
                }
            },
                {
                    body: t.Object({
                        id: t.String(),
                        name: t.String(),
                        asKnowAs: t.String(),
                        bornedAt: t.String(),
                        stack: t.Any(),
                    },
                    { description: "Create a new person with the properties name, AKA, bornedAt and stack" }),
                    detail: {
                        summary: 'Create a new person',
                        tags: ['Person']
                    }

                }).get(":id", ( async ({ params: { id } }) => {
                    return await getPersonUseCase.Execute(id);
                }),
                    {
                        detail: {
                            tags: ['Person']
                        }
                    })
        );

        return this;
    }

    start(): Elysia {
        this.__app.listen(this._defaultPorToListen)

        return this.__app;
    }
}