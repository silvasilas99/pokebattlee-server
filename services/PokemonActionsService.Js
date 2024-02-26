const _ = require("lodash");

const Pokemon = require("./../models/Pokemon");
const PokemonBattlesHistory = require("./../models/PokemonBattlesHistory");

module.exports = {
    getWinnerAndLoserPokemons (pokemonA, pokemonB) {
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
    },

    async createPokemonHistoryAndReturnId (
        pokemonA,
        pokemonB,
        winner,
        loser
    ) {
        const battleHistory = await PokemonBattlesHistory.create({
            pokemonA: _.get(pokemonA, "_id"),
            pokemonB: _.get(pokemonB, "_id"),
            pokemonWinner: _.get(winner, "_id"),
            pokemonLoser: _.get(loser, "_id")
        });
        const battleHistoryId = _.get(battleHistory, "_id");
        
        return battleHistoryId;
    },

    async updateWinnerPokemonInstance (
        winner, 
        battleHistoryId
    ) {
        const winnerUpdatedLevel = (_.get(winner, "nivel") + 1);
        winner.nivel = winnerUpdatedLevel;
        
        const winnerBattles = _.get(winner, "battles", []);
        winnerBattles.push(battleHistoryId)
        winner.battles = winnerBattles;
        
        await winner.save();
    
        return winner;
    },

    async updateOrDeleteLoserPokemonInstance (
        loser,
        battleHistoryId
    ) {
        const loserUpdatedLevel = (_.get(loser, "nivel") - 1);
        loser.nivel = loserUpdatedLevel;
        if (loserUpdatedLevel === 0) {
            await Pokemon.findByIdAndDelete(_.get(loser, "_id", "no-id"));
            return loser;
        }
    
        const loserBattles = _.get(loser, "battles", []);
        loserBattles.push(battleHistoryId)
        loser.battles = loserBattles;
        await loser.save();
        
        return loser;
    }
}