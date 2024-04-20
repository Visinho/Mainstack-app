import dotenv from 'dotenv';
import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import bodyParser from 'body-parser';

import deserializeUser from "./middlewares/deserializeUser";



const port = config.get<number>("port");

// Load environment variables from .env file
dotenv.config(); 

const app = express();

app.use(express.json());
// app.use(bodyParser.json());

app.use(deserializeUser);

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);

    await connect();
    routes(app)
})