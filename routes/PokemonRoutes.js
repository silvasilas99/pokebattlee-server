const router = require('express').Router();

const PokemonCrudController = require('./../controllers/PokemonCrudController');
const PokemonActionsController = require('./../controllers/PokemonActionsController');

/**
 * @swagger
 *  /pokemons:
 *  get:
 *    summary: Find and return all pokemons
 *    description: Retrieve a list of all pokemons
 *    responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The pokemon ID.
 *                     example: "65d813b672523cb87e732f61 "
 *                   __v:
 *                     type: integer
 *                     description: Version of doc.
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     description: Date and time of the creation of the pokemon.
 *                     example: "2024-02-23T20:31:47.615Z"
 *                   updatedAt:
 *                     type: string
 *                     description: Date and time of last update of the pokemon.
 *                     example: "2024-02-23T20:32:39.606Z"
 *                   tipo:
 *                     type: string
 *                     description: Type of the pokemon.
 *                     example: "charizard"
 *                   treinador:
 *                     type: string
 *                     description: Coach of the pokemon.
 *                     example: "Treinador Fulano"
 *                   nivel:
 *                     type: integer
 *                     description: Level of the pokemon.
 *                     example: 1
 *                   battles:
 *                     type: array
 *                     description: Array of battles history IDs. Linked to PokemonBattlesHistory model
 *                     example: ["65d8ffacd8b857010b3012d1", "65d900e73f7bbc4e19798c40"]
*/
router.get('/', PokemonCrudController.findAllPokemons);

/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Find a pokemon by ID
 *     description: Retrieve a pokemon by ID.
 *     responses:
 *       200:
 *         description: A single pokemon.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  _id:
 *                    type: string
 *                    description: The pokemon ID.
 *                    example: "65d813b672523cb87e732f61 "
 *                  __v:
 *                    type: integer
 *                    description: Version of doc.
 *                    example: 1
 *                  createdAt:
 *                    type: string
 *                    description: Date and time of the creation of the pokemon.
 *                    example: "2024-02-23T20:31:47.615Z"
 *                  updatedAt:
 *                    type: string
 *                    description: Date and time of last update of the pokemon.
 *                    example: "2024-02-23T20:32:39.606Z"
 *                  tipo:
 *                    type: string
 *                    description: Type of the pokemon.
 *                    example: "charizard"
 *                  treinador:
 *                    type: string
 *                    description: Coach of the pokemon.
 *                    example: "Treinador Fulano"
 *                  nivel:
 *                    type: integer
 *                    description: Level of the pokemon.
 *                    example: 1
 *                  battles:
 *                    type: array
 *                    description: Array of battles history IDs. Linked to PokemonBattlesHistory model
 *                    example: ["65d8ffacd8b857010b3012d1", "65d900e73f7bbc4e19798c40"]
*/
router.get('/:id', PokemonCrudController.findPokemonById);

/**
 * @swagger
 * /pokemons:
 *   post:
 *     summary: Create a pokemon
 *     description: Retrieve the created pokemon.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 description: Type of the pokemon.
 *                 example: "charizard"
 *               treinador:
 *                 type: string
 *                 description: Coach of the pokemon.
 *                 example: "Treinador Fulano"
 *     responses:
 *       200:
 *         description: A recently created pokemon.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The pokemon ID.
 *                   example: "65d813b672523cb87e732f61 "
 *                 __v:
 *                   type: integer
 *                   description: Version of doc.
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   description: Date and time of the creation of the pokemon.
 *                   example: "2024-02-23T20:31:47.615Z"
 *                 updatedAt:
 *                   type: string
 *                   description: Date and time of last update of the pokemon.
 *                   example: "2024-02-23T20:32:39.606Z"
 *                 tipo:
 *                   type: string
 *                   description: Type of the pokemon.
 *                   example: "charizard"
 *                 treinador:
 *                   type: string
 *                   description: Coach of the pokemon.
 *                   example: "Treinador Fulano"
 *                 nivel:
 *                   type: integer
 *                   description: Level of the pokemon. In this route, will always return 1, the default level.
 *                   example: 1
 *                 battles:
 *                   type: array
 *                   description: Array of battles history IDs. Linked to PokemonBattlesHistory model. In this route, will always return a empty array.
 *                   example: []
*/
router.post('/', PokemonCrudController.createPokemon);

/**
 * @swagger
 * /pokemons/{id}:
 *   put:
 *     summary: Update a pokemon coach by id
 *     description: Retrieve 204 status code on success.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: Hashed ID of the pokemon to update
 *           example: 65d813b672523cb87e732f61
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:      # Request body contents
 *             type: object
 *             properties:
 *               treinador:
 *                 type: string
 *                 description: Coach of the pokemon.
 *                 example: "Treinador Fulano"
 *     responses:
 *       204: 
 *         description: OK
*/
router.put('/:id', PokemonCrudController.updatePokemon);

/**
 * @swagger
 * /pokemons/{id}:
 *   delete:
 *     summary: Delete a pokemon coach by id
 *     description: Retrieve 204 status code on success.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: Hashed ID of the pokemon to delete
 *           example: 65d813a672523ab87eb32e61
 *     responses:
 *       204: 
 *         description: OK
*/
router.delete('/:id', PokemonCrudController.deletePokemon);

/**
 * @swagger
 * /pokemons/{pokemonAId}/{pokemonBId}:
 *   post:
 *     summary: Delete a pokemon coach by id
 *     description: Retrieve 204 status code on success.
 *     parameters:
 *       - in: path
 *         name: pokemonAId
 *         schema:
 *           type: string
 *           required: true
 *           description: Hashed ID of the first pokemon choosed to battle
 *           example: e2d813a672523ab87eb32e82
 *       - in: path
 *         name: pokemonBId
 *         schema:
 *           type: string
 *           required: true
 *           description: Hashed ID of the second pokemon choosed to battle
 *           example: 65d813b672523cb87e732f61
 *     responses:
 *       200:
 *         description: The winner and loser pokemons.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vencedor: 
 *                   type: object
 *                   properties: 
 *                     _id:
 *                       type: string
 *                       description: The winner pokemon ID.
 *                       example: "65d813b672523cb87e732f61 "
 *                     __v:
 *                       type: integer
 *                       description: Version of doc.
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       description: Date and time of the creation of the pokemon.
 *                       example: "2024-02-23T20:31:47.615Z"
 *                     updatedAt:
 *                       type: string
 *                       description: Date and time of last update of the pokemon.
 *                       example: "2024-02-23T20:32:39.606Z"     # Must be recent, cause received updating to increase the level
 *                     tipo:
 *                       type: string
 *                       description: Type of the pokemon.
 *                       example: "charizard"
 *                     treinador:
 *                       type: string
 *                       description: Coach of the pokemon.
 *                       example: "Treinador Fulano"
 *                     nivel:
 *                       type: integer
 *                       description: Updated level of the pokemon. As it is the winner, must be increased with 1
 *                       example: 2
 *                     battles:
 *                       type: array
 *                       description: Updated array of battles history IDs. Linked to PokemonBattlesHistory model. In this route, will always a updated list with the batte history id added
 *                       example: ["ced813b67d2a6cb87e732a21"]
 *                 perdedor: 
 *                   type: object
 *                   properties: 
 *                     _id:
 *                       type: string
 *                       description: The loser pokemon ID.
 *                       example: "e2d813a672523ab87eb32e82 "
 *                     __v:
 *                       type: integer
 *                       description: Version of doc.
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                       description: Date and time of the creation of the pokemon.
 *                       example: "2024-02-23T20:31:47.615Z"
 *                     updatedAt:
 *                       type: string
 *                       description: Date and time of last update of the pokemon.
 *                       example: "2024-02-23T20:32:39.606Z"  # Must be recent, cause received updating to decrease the level
 *                     tipo:
 *                       type: string
 *                       description: Type of the pokemon.
 *                       example: "pikachu"
 *                     treinador:
 *                       type: string
 *                       description: Coach of the pokemon.
 *                       example: "Treinador Ciclano"
 *                     nivel:
 *                       type: integer
 *                       description: Level of the pokemon. As it is the winner, must be decreased with 1. If reaches 0, the pokemon is destroied
 *                       example: 1
 *                     battles:
 *                       type: array
 *                       description: Updated array of battles history IDs. Linked to PokemonBattlesHistory model. In this route, will always a updated list with the batte history id added
 *                       example: [ "d2ee213a652423ab87eb52fe1", "2abe213a63ab87eb23dc55242"]
 *
*/
router.post('/:pokemonAId/:pokemonBId', PokemonActionsController.battle);

module.exports = router;