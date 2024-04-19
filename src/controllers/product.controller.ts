import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProduct } from "../services/product.service";

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
    try {
        const userId = res.locals.user._id;
        const body = req.body;

        // Call the service function to create a product
        const product = await createProduct({ ...body, user: userId });

        // Send the product in the response
        return res.send(product);
    } catch (error) {
        // Handle errors
        console.error('Error creating product:', error);
        return res.status(500).send('Internal Server Error');
    }
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {

}
export async function getProductHandler(req: Request, res: Response) {

}
export async function deleteProductHandler(req: Request, res: Response) {

}