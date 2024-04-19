import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { UserDocument } from "./user.model";

export interface ProductInput {
    user: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        productId: {
            type: String,
            required: true,
            default: () => `product_${uuidv4()}`,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
