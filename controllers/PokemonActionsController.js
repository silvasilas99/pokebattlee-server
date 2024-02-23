const _ = require("lodash")

const Pokemon = require("./../models/Pokemon");
const PokemonBattlesHistory = require("./../models/PokemonBattlesHistory");

const getWinnerAndLoserPokemons = (pokemonA, pokemonB) => {
    let pokemonsDataToRandom = [
        {
            _id: _.get(pokemonA, "_id", "no-id"), 
            weight: _.get(pokemonA, "nivel", 0)     // The "nivel" prop is the metric of probability
        },
        { 
            _id: _.get(pokemonB, "_id", "no-id"), 
            weight: _.get(pokemonB, "nivel", 0)
        }
    ];

    let sumOfWeights =
        Math.random() * pokemonsDataToRandom.reduce((sum, { weight }) => sum + weight, 0);

    const { _id } = pokemonsDataToRandom.find(
        ({ weight }) => (sumOfWeights -= weight) < 0
    );
    
    if (_.get(pokemonA, "_id", "no-id") === _id) {
        return {
            winner: pokemonA,
            loser: pokemonB
        }
    }

    return {
        winner: pokemonB,
        loser: pokemonA
    }
}

const createPokemonHistoryAndReturnId = async (
    pokemonA,
    pokemonB,
    winner,
    loser
) => {
    const battleHistory = await PokemonBattlesHistory.create({
        pokemonA: _.get(pokemonA, "_id"),
        pokemonB: _.get(pokemonB, "_id"),
        pokemonWinner: _.get(winner, "_id"),
        pokemonLoser: _.get(loser, "_id")
    });
    const battleHistoryId = _.get(battleHistory, "_id");
    
    return battleHistoryId;
}

const updateWinnerPokemonInstance = async (
    winner, 
    battleHistoryId
) => {
    const winnerUpdatedLevel = (_.get(winner, "nivel") + 1);
    winner.nivel = winnerUpdatedLevel;
    
    const winnerBattles = _.get(winner, "battles", []);
    winnerBattles.push(battleHistoryId)
    winner.battles = winnerBattles;
    
    await winner.save();

    return winner;
}

const updateOrDeleteLoserPokemonInstance = async (
    loser,
    battleHistoryId
) => {
    const loserUpdatedLevel = (_.get(loser, "nivel") - 1);
    loser.nivel = loserUpdatedLevel;
    if (loserUpdatedLevel === 0) {
        await Pokemon.findByIdAndDelete(_.get(loser, "_id", "no-id"));
        return loser;
    }

    const loserBattles = _.get(loser, "battles", []);
    loserBattles.push(battleHistoryId)
    loser.battles = loserUpdatedBattles;
    await loser.save();
    
    return loser;
}

module.exports = {
    async battle(req, res) {
        try {
            const { 
                pokemonAId,
                pokemonBId
            } = req.params;

            // Making some validations
            if (pokemonAId === pokemonBId) {
                return res.status(400).json({ message: "You must select two distincts pokemons to battle." });
            }
            let pokemonA = await Pokemon.findById(pokemonAId);
            if (!pokemonA) {
                return res.status(404).json({ message: "Pokemon A not found." });
            }
            let pokemonB = await Pokemon.findById(pokemonBId);
            if (!pokemonB) {
                return res.status(404).json({ message: "Pokemon B not found." });
            }

            const {
                winner,
                loser
            } = getWinnerAndLoserPokemons(pokemonA, pokemonB);

            const battleHistoryId = 
                await createPokemonHistoryAndReturnId(pokemonA, pokemonB, winner, loser);

            const updatedWinner =
                await updateWinnerPokemonInstance(winner, battleHistoryId);

            const updatedLoser =
                await updateOrDeleteLoserPokemonInstance(loser, battleHistoryId);

            return res.status(200).json({ 
                vencedor: updatedWinner, 
                perdedor: updatedLoser 
            });
        } catch (err) {
            console.error(`Error while updating pokemon: ${err}`);
            return res.status(500).json(err.message);
        }
    }
}