import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput } from "../schema/product.schema";
import { UpdateProduct, createProduct, deleteProduct, getProduct } from "../services/product.service";

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
            return res.status(404).send("Product not found!");
        }

        // If the product is found, send it in the response
        return res.send(product);
    } catch (error) {
        // Handle errors
        console.error('Error fetching product:', error);
        return res.status(500).send('Internal Server Error');
    }
}

export async function updateProductHandler(
    req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>,
    res: Response
) {
    try {
        // Extract user ID from the request
        const userId = res.locals.user._id;

        // Extract product ID from the request parameters
        const productId = req.params.productId;

        // Extract update data from the request body
        const update = req.body;

        // Find the product by ID
        const product = await getProduct({ productId });

        // If product is not found, return 404
        if (!product) {
            return res.status(404).send("Product not found!");
        }

        // Check if the user is authorized to update the product
        if (String(product.user) !== userId) {
            return res.status(403).send("You are not authorized to update this product!");
        }

        // Update the product and get the updated document
        const updatedProduct = await UpdateProduct({ productId }, update, { new: true });

        // Send the updated product in the response
        return res.send(updatedProduct);
    } catch (error) {
        // Handle errors
        console.error('Error updating product:', error);
        return res.status(500).send('Internal Server Error');
    }
}

export async function deleteProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    // Extract user ID from the request
    const userId = res.locals.user._id;

    // Extract product ID from the request parameters
    const productId = req.params.productId;

    // Find the product by ID
    const product = await getProduct({ productId });

    // If product is not found, return 404
    if (!product) {
      return res.sendStatus(404);
    }

    // Check if the user is authorized to delete the product
    if (String(product.user) !== userId) {
        return res.status(403).send("You are not authorized to update this product!");
    }

    // Delete the product
    await deleteProduct({ productId });

    // Send a success response
    return res.status(200).send("Successfully deleted!");
  } catch (error) {
    // Handle errors
    console.error('Error deleting product:', error);
    return res.status(500).send('Internal Server Error');
  }
}
