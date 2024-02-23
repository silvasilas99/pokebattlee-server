const router = require('express').Router();

const PokemonCrudController = require('./../controllers/PokemonCrudController');
const PokemonActionsController = require('./../controllers/PokemonActionsController');

router.get('/', PokemonCrudController.findAllPokemons);
router.get('/:id', PokemonCrudController.findPokemonById);
router.post('/', PokemonCrudController.createPokemon);
router.put('/:id', PokemonCrudController.updatePokemon);
router.delete('/:id', PokemonCrudController.deletePokemon);

router.post('/:pokemonAId/:pokemonBId', PokemonActionsController.battle);

module.exports = router;