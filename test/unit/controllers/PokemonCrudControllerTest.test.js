const _ = require("lodash");
const {describe, expect, test} = require("@jest/globals");;

const PokemonRoutes = require("../../../routes/PokemonRoutes");
const PokemonCrudController = require("../../../controllers/PokemonCrudController");

const mockPokemonObject = (type, coach) => {
    const pokemonObject = 
    {
        battles: [],
        tipo: type,
        treinador: coach,
        nivel: 1,
        __v: 0
    };
    return pokemonObject;
}

jest.mock("./../../services/PokemonCrudService", () => {
    const originalModule = jest.requireActual("./../../services/PokemonCrudService");
    const pokemonObject = {};

    return {
        __esModule: true,
        ...originalModule,
        createPokemon: jest.fn(() => pokemonObject)
    };
});

const mockRequest = () => {
    let requestMock = {};
    requestMock.body = jest.fn().mockReturnValue(requestMock);
    requestMock.params = jest.fn().mockReturnValue(requestMock);
    return requestMock;
}

const mockResponse = () => {
    let expectedResponse = {};
    expectedResponse.send = jest.fn().mockReturnValue(expectedResponse);
    expectedResponse.status = jest.fn().mockReturnValue(expectedResponse);
    expectedResponse.json = jest.fn().mockReturnValue(expectedResponse);
    return expectedResponse;
}

describe("Test method \'PokemonCrudController.createPokemon\' ", () => {
    test("Test pokemon creation with invalid type", async () => {
        const data = {
            tipo: "some invalid type",
            treinador: "Tester"
        };

        let requestMock = mockRequest();
        requestMock = {
            ...requestMock,
            body: { ...requestMock.body, ...data}
        }
        let responseMock = mockResponse();
        
        await PokemonCrudController.createPokemon(requestMock, responseMock);

        expect(responseMock.status).toHaveBeenCalledWith(400);
        expect(responseMock.json).toHaveBeenCalledWith({
            message: "You can not create a pokemon with this type." 
        });
    })


    // TODO: FIX THIS TEST USING CORRECTLY THE JEST STUBS TO MOCK PokemonCrudService
    test("Test pokemon successfull creation", async () => {
        const data = {
            tipo: "charizard",
            treinador: "Tester"
        };
        let requestMock = mockRequest();
        requestMock = {
            ...requestMock,
            body: { ...requestMock.body, ...data}
        }
        let responseMock = mockResponse();
        await PokemonCrudController.createPokemon(requestMock, responseMock);
        const pokemonMock = mockPokemonObject(data.tipo, data.treinador);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith(pokemonMock);
    })
});