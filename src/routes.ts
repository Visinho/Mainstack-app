import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import validateResource from "./middlewares/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middlewares/requireUser";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controllers/product.controller";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
    app.post("/api/users", validateResource(createUserSchema), createUserHandler);
    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);
    app.get("/api/sessions", requireUser, getUserSessionHandler);
    app.delete("/api/sessions", requireUser, deleteUserSessionHandler);
    // app.post("/api/products", [requireUser, validateResource(createProductSchema)], createProductHandler);
    // app.put("/api/products/update", [requireUser, validateResource(updateProductSchema)], updateProductHandler);
    // app.get("/api/products/get", validateResource(getProductSchema), getProductHandler);
    // app.delete("/api/products/delete", [requireUser, validateResource(deleteProductSchema)], deleteProductHandler);
    
}

export default routes;