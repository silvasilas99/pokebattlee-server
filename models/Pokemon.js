const mongoose = require('mongoose');

const Pokemon = mongoose.Schema(
    {
        tipo: {
            type: String,
            max: 255,
            required: true
        },
        treinador: {
            type: String,
            max: 255,
            required: true
        },
        nivel: { 
            type: Number,
            default: 1
        },
        battles: [{     // TODO: Understand which is the correct language to property
            type: mongoose.Schema.Types.ObjectId, 
            ref: "PokemonBattlesHistory",
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pokemon", Pokemon);