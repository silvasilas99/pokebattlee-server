const _ = require("lodash")

const PokemonActionsService = require("./../services/PokemonActionsService")
const PokemonCrudService = require("./../services/PokemonCrudService");

const checkIfPokemonExists = (pokemon, res) => {
    if (!pokemon) {
        const pokemonId = _.get(pokemon, "id", "no-id");
        console.warning(`Tryed to find a pokemon with ID ${pokemonId} that does not exist.`)
        return res.status(404).json({ message: `Pokemon with ID ${pokemonId} does not exist.` });
    }

    return 0;
}

module.exports = {
    async battle(req, res) {
        const pokemonAId = _.get(req.params, "pokemonAId", "no-id");
        const pokemonBId = _.get(req.params, "pokemonBId", "no-id");

        try {
            // Validating if the action is being called to the same Pokemon Object
            if (pokemonAId === pokemonBId) {
                return res.status(400).json({ message: "You must select two distincts pokemons to battle." });
            }
            
            // Validating if the IDs passed to battle is reffered to a existing Pokemon Object
            let pokemonA = 
                await PokemonCrudService.findAndReturnPokemonById(pokemonAId);
            const isPokemonAOk = checkIfPokemonExists(pokemonA, res);
            if (isPokemonAOk !== 0) {
                return;
            }
            // TODO: OPTIMIZE THE VERIFICATION
            let pokemonB =
                await PokemonCrudService.findAndReturnPokemonById(pokemonBId);
            const isPokemonBOk = checkIfPokemonExists(pokemonB, res);
            if (isPokemonBOk !== 0) {
                return;
            }

            const {
                winner,
                loser
            } = PokemonActionsService.getWinnerAndLoserPokemons(pokemonA, pokemonB);

            // TODO: TRY TO IMPLEMENT EVENT-LISTENER TO IMPROVE IF NEEDS SCALE 
            const battleHistoryId =
                await PokemonActionsService.createPokemonHistoryAndReturnId(
                    pokemonA, 
                    pokemonB, 
                    winner, 
                    loser
                );
            const updatedWinner =
                await PokemonActionsService.updateWinnerPokemonInstance(
                    winner, 
                    battleHistoryId
                );
            const updatedLoser =
                await PokemonActionsService.updateOrDeleteLoserPokemonInstance(
                    loser, 
                    battleHistoryId
                );

            return res.status(200).json({ 
                vencedor: updatedWinner, 
                perdedor: updatedLoser 
            });
        } catch (err) {
            console.debug({
                err,   // Instance of error
                "pokemon_a_id": pokemonAId,
                "pokemon_b_id": pokemonBId,
            });
            return res
                .status(_.get(err, "status-code", 500))
                .json({
                    message: _.get(err, "message", "Some unhandled error occured. Try again later, or contact the app administrator.")
                });
        }
    }
}