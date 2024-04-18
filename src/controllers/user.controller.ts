import { Request, Response } from "express";
import logger from "../utils/logger";
import { Omit } from "lodash";
import { createUser } from "../services/user.service";
import { CreateUserInput } from "../schema/user.schema";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        // Await the createUser function to get the user object
        const user = await createUser(req.body);
        
        // Send the user object as JSON response
        return res.json(user);
    } catch (e: any) {
        // Log the error
        logger.error(e);
        // Send an error response with status code 409 and error message
        res.status(409).send(e.message);
    }
}
