
import app from "../app.js";
import request from "supertest"

describe("Testing App", () => {

    describe("GET Boat Slips", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).get("/boat-slips")
            expect(response.statusCode).toBe(200)
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
            expect(response.statusCode).toBe(409)
            expect(response.body.Message).toBe("There are no available boat slips.")
        })
    })

    describe("PUT Boat Slip", () =>{
        test("should respond with a 204 status code", async () => {
            for(let i = 0; i < 3; i++){
                let url = "/boat-slips/" + String(i+1) + "/vacate"
                let response = await request(app).put(url)
                expect(response.statusCode).toBe(204)
            }
        })

        test("should respond with a 409 status code", async () => {
                let url = "/boat-slips/" + String(1) + "/vacate"
                let response = await request(app).put(url)
                let isVacantError = "Boat slip '" + 1 + "' is currently vacant."
                expect(response.statusCode).toBe(409)
                expect(response.body.Message).toBe(isVacantError)
        })
        
        test("should respond with a 404 status code", async () => {
            let url = "/boat-slips/" + String(4) + "/vacate"
            let response = await request(app).put(url)
            let notFoundError = "Boat slip '" + 4 + "' not found."
            expect(response.statusCode).toBe(404)
            expect(response.body.Message).toBe(notFoundError)
        })
    })
})