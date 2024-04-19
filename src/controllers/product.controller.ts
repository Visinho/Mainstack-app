import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput } from "../schema/product.schema";
import { createProduct, getProduct } from "../services/product.service";

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res: Response) {
    try {
        // Extract user ID from the request's local variables
        const userId = res.locals.user._id;

        // Extract product details from the request body
        const body = req.body;

        // Create the product, including the user ID
        const product = await createProduct({ ...body, user: userId });

        // Send the created product in the response
        return res.send(product);
    } catch (error) {
        // Handle errors
        console.error('Error creating product:', error);
        return res.status(500).send('Internal Server Error');
    }
}

export async function getProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
    try {
        // Extract the product ID from the request parameters
        const productId = req.params.productId;

        // Find the product by its ID
        const product = await getProduct({ productId });

        // If no product is found, return a 404 status
        if (!product) {
            return res.sendStatus(404);
        }

        // If the product is found, send it in the response
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