const _ = require("lodash")

const PokemonActionsService = require("./../services/PokemonActionsService")
const PokemonCrudService = require("./../services/PokemonCrudService");

/**
 * 
 * @param {*} pokemonId 
 * @param {*} res 
 * @returns Pokemon model instance or null with direct response with code 404 to HTTP Client
 */
const tryToFindPokemonById = async (pokemonId, res) => {
    let pokemon = await PokemonCrudService.findAndReturnPokemonById(pokemonId);
    if (!pokemon) {
        console.log(`Tryed to find a pokemon with ID ${pokemonId} that does not exist.`)
        res.status(404).json({ message: `Pokemon with ID ${pokemonId} does not exist.` });
        return null;
    }
    return pokemon;
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
            const pokemonA = await tryToFindPokemonById(pokemonAId, res);
            if (!pokemonA) {
                return;
            }
            let pokemonB = await tryToFindPokemonById(pokemonBId, res);
            if (!pokemonB) {
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