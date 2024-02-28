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

describe("Test the module PokemonActionsController", () => 
{
    describe("Put two Pokemons to fight", () =>
    {
        let pokemonA, pokemonB;
        beforeEach(async () => {
            pokemonA = await Pokemon.create({
                tipo: "pikachu",
                treinador: "Tester"
            });

            pokemonB = await Pokemon.create({
                tipo: "charizard",
                treinador: "Developer"
            });
        });

        it(
            "Must return 400 if the Pokemon IDs is the same", 
            async () => {
                const response = await request(app).post(`/pokemons/${pokemonB._id}/${pokemonB._id}`);

                expect(response.status).toBe(400);
                expect(response.body.message).toEqual("You must select two distincts pokemons to battle.");
            }
        );

        it(
            "Must return 404 if one or both Pokemon IDs is invalid", 
            async () => {
                const incorredId = "639c80ef98284bfdf111ad09";
                const response = await request(app).post(`/pokemons/${incorredId}/${pokemonB._id}`);

                expect(response.status).toBe(404);
                expect(response.body.message).toEqual(`Pokemon with ID ${incorredId} does not exist.`);
            }
        );

        it(
            "Must return 200 and the winner and loser Pokemons", 
            async () => {
                const response = await request(app).post(`/pokemons/${pokemonA._id}/${pokemonB._id}`)
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty("vencedor");
                expect(response.body).toHaveProperty("perdedor");
            }
        );
    }); 
});
