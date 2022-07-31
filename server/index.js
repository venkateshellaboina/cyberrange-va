import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';
import { dirname, join } from 'path';
import getVacantSlipNumber from './util.js';

// set up express app
const app = express();
app.use(cors());
app.use(express.json());

// set up environment
dotenv.config();

// set up low
const database = join(dirname(fileURLToPath(import.meta.url)), '../database.json');
const jsonAdapter = new JSONFile(database);
const lowdb = new Low(jsonAdapter);


// boat slips base json
const boatSlipsInit = [
    {
        slipNumber: 1,
        vacant: true,
        vesselName: ""
    },
    {
        slipNumber: 2,
        vacant: true,
        vesselName: ""
    },
    {
        slipNumber: 3,
        vacant: true,
        vesselName: ""
    }
]


await lowdb.read()

if (!lowdb.data){
    lowdb.data = {boatSlips: boatSlipsInit}
}



app.get("/boat-slips", (req, res) => {
    res.json(lowdb.data.boatSlips)
    return
})


const listener = app.listen(process.env.PORT || 8080, () => {
    console.log('app is listening on port', listener.address().port)
});