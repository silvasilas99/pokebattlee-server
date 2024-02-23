const Pokemon = require('./../models/Pokemon');
const ALLOWED_POKEMON_TYPES = ["charizard", "mewtwo", "pikachu"];

module.exports = {
    async createPokemon(req, res) {
        try {
            const { 
                tipo,
                treinador
            } = req.body;
            if (!ALLOWED_POKEMON_TYPES.includes(tipo)) {
                return res.status(400).json({ message: "You can not create a pokemon with this type."});
            }
            const newPokemon = await Pokemon.create({
                tipo: tipo,
                treinador: treinador
            });
            return res.status(200).json(newPokemon);
        } catch (err) {
            console.error(`Error while creating pokemon: ${err.message}`);
            return res.status(500).json(err.message);
        }
    },

    async updatePokemon(req, res) {
        try {
            const { id } = req.params;
            let pokemon = await Pokemon.findById(id);
            if (!pokemon) {
                return res.status(404).json({ message: "Pokemon not found." });
            }

            const { treinador } = req.body;
            pokemon.treinador = treinador;
            await pokemon.save();

            return res.sendStatus(204);
        } catch (err) {
            console.error(`Error while updating pokemon: ${err.message}`);
            return res.status(500).json(err.message);
        }
    },

    async deletePokemon(req, res) {
        try {
            const pokemon = await Pokemon.findById(req.params.id);
            if (!pokemon) {
                return res.status(404).json({ message: "Pokemon not found." });
            }
            await Pokemon.deleteOne(pokemon);
            return res.status(204);
        } catch (err) {
            console.error(`Error while deleting pokemon: ${err.message}`);
            return res.status(500).json(err.message);
        }
    },

    async findPokemonById(req, res) {
        try {
            const { id } = req.params;
            const pokemon = await Pokemon.findById(id);
            if (!pokemon) {
                return res.status(404).json({ message: "Pokemon not found." });
            }
            res.status(200).json(pokemon);
        } catch (err) {
            console.error(`Error while finding pokemon by ID: ${err.message}`);
            return res.status(500).json(err.message);
        }
    },


    async findAllPokemons(req, res) {
        try {
            const pokemons = await Pokemon.find({});
            return res.status(200).json(pokemons);
        } catch (err) {
            console.error(`Error while finding all pokemons: ${err.message}`);
            return res.status(500).json(err.message);
        }
    }
}