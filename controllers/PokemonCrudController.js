const _ = require("lodash");

const PokemonCrudService = require("./../services/PokemonCrudService");

const ALLOWED_POKEMON_TYPES = ["charizard", "mewtwo", "pikachu"];

const checkPokemonTypeBeforeCreate = (type, res) => {
    if (!ALLOWED_POKEMON_TYPES.includes(type)) {
        console.warning(`Tryed to create a pokemon of type ${_.get(data, "tipo", "no-type")} and the opperation was interrupted.`)
        return res.status(400).json({ message: "You can not create a pokemon with this type."});
    }
    return 0;
}

const checkIfPokemonExists = (pokemon, res) => {
    if (!pokemon) {
        console.warning(`Tryed to find a pokemon with ID ${_.get(pokemon, "id", "no-id")} that does not exist.`)
        return res.status(404).json({ message: "Pokemon not found." });
    }

    return 0;
}

module.exports = {
    async createPokemon(req, res) {
        const data = _.get(req, "body", {});

        try {
            const isPokemonOk = 
                checkPokemonTypeBeforeCreate(
                    _.get(data, "tipo", ""), 
                    res     // Response instance
                );
            if (isPokemonOk !== 0) {
                return;
            }

            const newPokemon =
                await PokemonCrudService.createAndReturnPokemon(req.body)

            return res.status(200).json(newPokemon);
        } catch (err) {
            console.debug({
                err,   // Instance of error
                "request_data": data
            });
            return res
                .status(_.get(err, "code", 500))
                .json({
                    message: _.get(err, "message", "Some unhandled error occured. Try again later, or contact the app administrator.")
                });
        }
    },

    async updatePokemon(req, res) {
        const pokemonId = _.get(req.params, "id", "no-id");
        const data = _.get(req, "body", {});

        try {
            let pokemon = 
                await PokemonCrudService.findAndReturnPokemonById(pokemonId);

            const isPokemonOk = checkIfPokemonExists(pokemon, res);
            if (isPokemonOk !== 0) {
                return;
            }

            await PokemonCrudService.updatePokemonCoach(pokemon, _.get(data, "treinador", ""))

            return res.sendStatus(204);
        } catch (err) {
            console.debug({
                err,   // Instance of error
                "request_data": data,
                "pokemon_id": pokemonId
            });
            return res
                .status(_.get(err, "status-code", 500))
                .json({
                    message: _.get(err, "message", "Some unhandled error occured. Try again later, or contact the app administrator.")
                });
        }
    },

    async deletePokemon(req, res) {
        const pokemonId = _.get(req.params, "id", "no-id");
        try {
            let pokemon = 
                await PokemonCrudService.findAndReturnPokemonById(pokemonId);
            const isPokemonOk = checkIfPokemonExists(pokemon, res);
            if (isPokemonOk !== 0) {
                return;
            }

            await PokemonCrudService.deletePokemonById(pokemonId);

            return res.sendStatus(204);
        } catch (err) {
            console.debug({
                err,   // Instance of error
                "pokemon_id": pokemonId
            });
            return res
                .status(_.get(err, "status-code", 500))
                .json({
                    message: _.get(err, "message", "Some unhandled error occured. Try again later, or contact the app administrator.")
                });
        }
    },

    async findPokemonById(req, res) {
        const pokemonId = _.get(req.params, "id", "no-id");
        try {
            let pokemon =
                await PokemonCrudService.findAndReturnPokemonById(pokemonId);

            const isPokemonOk = checkIfPokemonExists(pokemon, res);
            if (isPokemonOk !== 0) {
                return;
            }

            return res.status(200).json(pokemon);
        } catch (err) {
            console.debug({
                err,   // Instance of error
                "pokemon_id": pokemonId
            });
            return res
                .status(_.get(err, "status-code", 500))
                .json({
                    message: _.get(err, "message", "Some unhandled error occured. Try again later, or contact the app administrator.")
                });
        }
    },

    async findAllPokemons(req, res) {
        try {
            const pokemons = 
                await PokemonCrudService.findAndReturnAllPokemons();
            return res.status(200).json(pokemons);
        } catch (err) {
            return res
                .status(_.get(err, "status-code", 500))
                .json({
                    message: _.get(err, "message", "Some unhandled error occured. Try again later, or contact the app administrator.")
                });
        }
    }
}