const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    // MongoDB connector
    async connectToMongoDb () {
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
    }
}