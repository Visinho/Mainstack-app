import mongoose from "mongoose";
// import config from "config";
import logger from "./logger";
import { ENV_VAR } from "../config/config";



async function connect() {
    // const dbUri = config.get<string>("dbUri");
    const dburi = ENV_VAR.dbUri;

    try {
        await mongoose.connect(dburi);
        logger.info("Connected to DB!");
    } catch (error) {
        logger.error("Could not connect to db!");
        process.exit(1);
    }
}

export default connect;