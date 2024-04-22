import supertest from "supertest";
import { createProduct } from "../src/services/product.service";
import mongoose from "mongoose";
import { signJwt } from "../src/utils/jwt.utils";
import express, { Express } from 'express';

const app: Express = express();


const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
user: userId, 
"title": "Testing my endpoint and making sure that everything is alright",
"description": "After having spent hours working on this project, it is safe to say that I am finally getting to the end of it. Even though it was not an easy task, I have worked tireless and I really hope that it will work as intended so I can get reward for my hard work!",
"price": 300.00,
"image": "https://visinho/Qerundjfr.jpg"
}

export const userPayload = {
    _id: userId,
    email: "Elvis@gmail.com",
    name: "Visinho"
}

describe("product", () => {
    describe("Get Product Route", () => {
        describe("given the product does not exist", () => {
            it("should return a 404", async () => {
                const productId = "product-123"

                await supertest(app).get(`/api/products/${productId}`).expect(404)
            })
        });

        describe("given the product does exist", () => {
            it("should return a 200 status and the product", async () => {

                const product = await createProduct(productPayload)

                const {body, statusCode} = await supertest(app).get(`/api/products/${product._id}`)

                expect(statusCode).toBe(200)

                expect(body.productId).toBe(product._id)
            })
        });

        describe("given the product does exist", () => {
            it("should return a 200 status and the product", async () => {
                const product = await createProduct(productPayload);
        
                const { body, statusCode } = await supertest(app).get(`/api/products/${product._id}`);
        
                expect(statusCode).toBe(200);
                expect(body.productId).toBe(product._id);
            }, 20000); // Timeout set to 10 seconds
        });
        

    });

    describe("create product route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403", async () => {
                const {statusCode} = await supertest(app).post("/api/products");

                expect(statusCode).toBe(403);
            });
        });

        describe("given the user is logged in", () => {
            it("should return a 200 and create the product", async () => {
                const jwt = signJwt(userPayload)
                const {statusCode, body} = await supertest(app).post("/api/products").set("Authorization", `Bearer ${jwt}`).send(productPayload)

                expect(statusCode).toBe(200)
                expect(body).toEqual(
                    {
                        user: expect.any(String),
                        title: "Testing my test app to be sure nothing broke and making sure that everything is alright",
                        description: "After having spent hours working on this project, it is safe to say that I am finally getting to the end of it. Even though it was not an easy task, I have worked tireless and I really hope that it will work as intended so I can get reward for my hard work!",
                        price: 300,
                        image: "https://visinho/Qerundjfr.jpg",
                        _id: expect.any(String),
                        productId: expect.any(String),
                        createdAt: "2024-04-21T18:29:31.792Z",
                        updatedAt: expect.any(String)
                    
                })

            })
        })
    })
});