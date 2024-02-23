const router = require('express').Router();
const PokemonCrudController = require('./../controllers/PokemonCrudController');

router.get('/', PokemonCrudController.findAllPokemons);
router.get('/:id', PokemonCrudController.findPokemonById);
router.post('/', PokemonCrudController.createPokemon);
router.put('/:id', PokemonCrudController.updatePokemon);
router.delete('/:id', PokemonCrudController.deletePokemon);

module.exports = router;