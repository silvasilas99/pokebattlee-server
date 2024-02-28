const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("./../../../core/app");
const Pokemon = require("./../../../models/Pokemon");

let MONGO_MEMORY_SERVER_INSTANCE;
beforeAll(async () => {
    MONGO_MEMORY_SERVER_INSTANCE = await MongoMemoryServer.create();
    const uri = MONGO_MEMORY_SERVER_INSTANCE.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await MONGO_MEMORY_SERVER_INSTANCE.stop();
});

describe("Test the module PokemonCrudController", () => 
{
    describe("Create a pokemon", () =>
    {
        it(
            "Must return 400 if the Pokemon type is invalid", 
            async () => {
                const response = await request(app)
                    .post("/pokemons")
                    .set("content-type", "application/json")
                    .send({
                        tipo: "some invalid type",
                        treinador: "Tester",
                    });

                expect(response.status).toBe(400);
                expect(response.body.message).toEqual("You can not create a pokemon with this type.");
            }
        );

        it(
            "Must return 200 and the Pokemon created", 
            async () => {
                const response = await request(app)
                    .post("/pokemons")
                    .set("content-type", "application/json")
                    .send({
                        tipo: "pikachu",
                        treinador: "Tester",
                    });
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("_id");
            }
        );
    });

    describe("Find all Pokemons", () => 
    {
        it(
            "Must return 200 and all Pokemons", 
            async () => {
                const response = await request(app)
                    .get("/pokemons")
                    .set("content-type", "application/json");
                expect(response.status).toBe(200);
            }
        );
    });

    describe("Find a single Pokemon by ID", () => 
    {
        let pokemon;
        beforeEach(async () => {
            pokemon = await Pokemon.create({
                tipo: "pikachu",
                treinador: "Tester"
            });
        });

        it(
            "Must return 404 if the Pokemon with the id does not exist", 
            async () => {
                const incorredId = "639c80ef98284bfdf111ad09";
                const response = await request(app).put(`/pokemons/${incorredId}`);

                expect(response.status).toBe(404);
                expect(response.body.message).toEqual("Pokemon not found.");
            }
        );

        it(
            "Must return 200 and a single Pokemon", 
            async () => {
                const response = await request(app)
                    .get(`/pokemons/${pokemon._id}`)
                    .set("content-type", "application/json");
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("_id");
            }
        );
    });

    describe("Update a Pokemon by ID", () => 
    {
        let pokemon;
        beforeEach(async () => {
            pokemon = await Pokemon.create({
                tipo: "pikachu",
                treinador: "Tester"
            });
        });

        it(
            "Must return 404 if the Pokemon with the id does not exist", 
            async () => {
                const incorredId = "639c80ef98284bfdf111ad09";
                const response = await request(app).put(`/pokemons/${incorredId}`);

                expect(response.status).toBe(404);
                expect(response.body.message).toEqual("Pokemon not found.");
            }
        );


        it("Must return 204 status code", async () => {
            const response = await request(app)
                .put(`/pokemons/${pokemon._id}`)
                .send({ treinador: "Tester Master" });

            expect(response.status).toBe(204);
        });
    });

    describe("Delete a Pokemon by ID", () => {
        let pokemon;
        beforeEach(async () => {
            pokemon = await Pokemon.create({
                tipo: "pikachu",
                treinador: "Tester"
            });
        });

        it(
            "Must return 404 if the Pokemon with the id does not exist",
            async () => {
                const incorredId = "639c80ef98284bfdf111ad09";
                const response = await request(app).put(`/pokemons/${incorredId}`);

                expect(response.status).toBe(404);
                expect(response.body.message).toEqual("Pokemon not found.");
            }
        );

        it(
            "Must return 204",
            async () => {
                const response = await request(app).delete(`/pokemons/${pokemon.id}`);
                expect(response.status).toBe(204);
            }
        );
    });
});
