import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

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
        default: () => `product_${nanoid()}`,
    },
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Session", productSchema);

export default ProductModel;