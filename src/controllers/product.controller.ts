import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProduct, getProduct } from "../services/product.service";

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

export async function getProductHandler(req: Request, res: Response) {
    try {
        const productId = req.params.productId;

        // Call the service function to get the product
        const product = await getProduct({ productId });

        // If the product is not found, send a 404 response
        if (!product) {
            return res.sendStatus(404);
        }

        // Send the product in the response
        return res.send(product);
    } catch (error) {
        // Handle errors
        console.error('Error fetching product:', error);
        return res.status(500).send('Internal Server Error');
    }
}


export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {

}


export async function deleteProductHandler(req: Request, res: Response) {

}