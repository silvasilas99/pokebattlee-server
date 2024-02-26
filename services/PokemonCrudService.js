const _ = require("lodash");

const Pokemon = require("../models/Pokemon");

const verifyRequiredParam = (
    inputValue,
    inputName
) => {
    if (!inputValue) {
        // TODO: IMPLEMENT BETTER PRATICES TO ERROR HANDLING
        throw new Error (`The ${inputName} parameter value is invalid. You should fill it with a valid value.`);
    }
}

module.exports = {
    async findAndReturnAllPokemons () {
        return await Pokemon.find({});
    },

    async createAndReturnPokemon (data) {
        return await Pokemon.create({
            tipo: _.get(data, "tipo", ""),
            treinador: _.get(data, "treinador", "")
        });
    },

    async findAndReturnPokemonById (id) {
        verifyRequiredParam(id, "id");
        return await Pokemon.findById(id);
    },

    async updatePokemonCoach (pokemon, coach) {    
        verifyRequiredParam(coach, "treinador")

        pokemon.treinador = coach;
        await pokemon.save();
        
        return 0;
    },

    async deletePokemonById (pokemonId) {
        verifyRequiredParam(pokemonId, "pokemonId");
        return await Pokemon.findByIdAndDelete(pokemonId);
    }

}