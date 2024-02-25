const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const pokemonRouter = require("./routes/PokemonRoutes");
const swagger = require("./swagger");

const app = express();
dotenv.config();
swagger.config(app);

// MongoDB connector
const {
    DB_ACCESS_URL,
    DB_NAME
} = process.env;

(async () => {
    try {
        await mongoose.connect(`${DB_ACCESS_URL}/${DB_NAME}`);
        console.info(`Connected with DB!`);
    } catch (error) {
        console.error(`Error while connecting with DB: ${error.message}.`);
    }
})();


// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/pokemons", pokemonRouter);

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));