
// const app = require("../app.js");
// const request = require("supertest")


import app from "../app.js";
import request from "supertest"

describe("Testing App", () => {
    describe("GET Boat Slips", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/boat-slips")
            expect(response.statusCode).toBe(200)
        })
    })
})