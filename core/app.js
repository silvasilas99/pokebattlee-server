const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const pokemonRouter = require("./../routes/PokemonRoutes");
app.use("/pokemons", pokemonRouter);

app.get("/", (req, res) => res.send("Hello World!"));

dotenv.config();
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

module.exports = app;