import * as Userservice from "../src/services/user.service";
import mongoose from "mongoose";
import supertest from "supertest";
import express, { Express } from 'express';
import * as SessionService from "../src/services/session.service";
import { createUserSessionHandler } from "../src/controllers/session.controller";

const app: Express = express();

const userId = new mongoose.Types.ObjectId().toString();

const userInput = {
    email: "Visinho@gmail.com",
    name: "Jane Doe",
    password: "Password123",
    passwordConfirmation: "Password123"
}

const userPayload = {
    email: "Visinho@gmail.com",
    name: "Jane Doe",
    _id: userId,
}

const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.36.0",
    createdAt: new Date("2024-04-18T01:14:43.473+00:00"),
    updatedAt: new Date("2024-04-18T01:14:48.473+00:00")
}

describe("user", () => {
    // User Registration
    describe("User registration", () => {
        describe("Given the username and password are valid", () => {
            it("should return the user payload", async () => {
                const createUserServiceMock = jest.spyOn(Userservice, "createUser")
                //@ts-ignore
                .mockReturnValueOnce(userPayload);

                const {statusCode, body} = await supertest(app).post("/api/users").send(userInput);

                expect(statusCode).toEqual(200);

                expect(body).toEqual(userPayload);

                expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
            })
        })

        describe("Given the passwords do not match", () => {
            it("should return a 400", async () => {
                const createUserServiceMock = jest.spyOn(Userservice, "createUser")
                //@ts-ignore
                .mockReturnValueOnce(userPayload);

                const {statusCode, body} = await supertest(app).post("/api/users").send({...userInput, passwordConfirmation: "Doesnotmatch"});

                expect(statusCode).toBe(400);

                expect(createUserServiceMock).not.toHaveBeenCalledWith();
            })

        })

        describe("Given the user service throws", () => {
            it("should return a 409 error", async () => {
                const createUserServiceMock = jest.spyOn(Userservice, "createUser")
                //@ts-ignore
                .mockRejectedValue("Error 409");

                const {statusCode, body} = await supertest(app).post("/api/users").send(userInput);

                expect(statusCode).toEqual(409);

                expect(createUserServiceMock).toHaveBeenCalled();
            })
        })
    })

    describe("Create user session", () => {
        describe("Given the username and password are valid", async () => {
            it("should return a signed accessToken and refreshToken", async () => {
                jest.spyOn(Userservice, "validatePassword").
                //@ts-ignore
                mockReturnValueOnce(userPayload)

                jest.spyOn(SessionService, "createSession").
                //@ts-ignore
                mockReturnValueOnce(sessionPayload)

                const req = {
                    get: () => {
                     return "a user agent"  
                    },
                    body: {
                        email: "Test@gmail.com",
                        password: "testing123"
                    }
                }

                const send = jest.fn();

                const res = {
                    send
                }

                // @ts-ignore
            await createUserSessionHandler(req, res)

            expect(send).toHaveBeenCalledWith({
                accessToken: expect.any(String), 
                refreshToken: expect.any(String)
            })
            })
        })
    })

})