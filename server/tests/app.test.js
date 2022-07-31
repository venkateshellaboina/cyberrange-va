
import app from "../app.js";
import request from "supertest"
import getVacantSlipNumber from "../utils/util.js"

describe("Testing App", () => {
    describe("GET Boat Slips", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/boat-slips")
            expect(response.statusCode).toBe(200)
        })
        test("should be of length 3", async () => {
            const response = await request(app).get("/boat-slips")
            expect(response.body.length).toBe(3)
        })
    })
    describe("POST Boat slip", () =>{
        test("should respond with a 200 status code", async () => {
            for(let i = 0; i < 3; i++){
                let response = await request(app).post("/boat-slips").send({vesselName: "Seas the day"})
                expect(response.statusCode).toBe(200)
            }
        })
        test("should respond with a 409 status code", async () =>{
            let response = await request(app).post("/boat-slips").send({vesselName: "Seas the day"})
            console.log(response.body)
            expect(response.statusCode).toBe(409)
            expect(response.body.Message).toBe("There are no available boat slips.")
        })
    })
    describe("PUT Boat Slip", () =>{
        test("should respond with a 204 status code", async () => {
            for(let i = 0; i < 3; i++){
                let url = "/boat-slips/" + String(i+1) + "vacate"
                let response = await request(app).put(url)
                expect(response.statusCode).toBe(204)
            }
        })
    })
})