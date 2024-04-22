// import dotenv from 'dotenv';
require("dotenv").config();
import express from "express";
// import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import bodyParser from 'body-parser';

import deserializeUser from "./middlewares/deserializeUser";
import { ENV_VAR } from './config/config';



// const port = config.get<number>("port");

const port = ENV_VAR.port;

// Load environment variables from .env file
// dotenv.config(); 

const app = express();

app.use(express.json());
// app.use(bodyParser.json());

connect();

app.use(deserializeUser);


routes(app)

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);

    // console.log(ENV_VAR);
    
})