const mongoose = require('mongoose');

const PokemonBattlesHistory = mongoose.Schema(
    {
        pokemonA: {        // Pokemon A state before the battle
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pokemon",
            required: true
        },
        pokemonB: {         // Pokemon B state before the battle
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pokemon",
            required: true
        },
        pokemonWinner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pokemon",
            required: true
        },
        pokemonLoser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pokemon",
            required: true
        }
        // TODO: Implement level versions control
    },
    { timestamps: true }
);

module.exports = mongoose.model("PokemonBattlesHistory", PokemonBattlesHistory);