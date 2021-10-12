const mongoose = require("mongoose")
const winston = require("winston")


// creating the database module
module.exports = connection = async () => {
    try {
        // throw new Error("Something terribly went wrong")
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        }

        await mongoose.connect(process.env.DB, connectionParams);
        winston.info("Database initiated...")
    }
    catch (err) {
        winston.error(err, "Could not connect to the database")
    }
}