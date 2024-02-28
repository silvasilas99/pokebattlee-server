const app = require("./core/app")
const mongoDbConnector = require("./core/mongoConnector");
const swagger = require("./swagger");

swagger.config(app);
await mongoDbConnector.connectToMongoDb();