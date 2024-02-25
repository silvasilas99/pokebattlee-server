const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "pokebattle-server",
            version: "1.0.0",
            description: "",
        },
    },
    apis: ["./routes/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
    config (app) {
        app.use("/doc", swaggerUi.serve, swaggerUi.setup(specs));
    }
};