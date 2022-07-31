import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getVacantSlipNumber from './util.js';
import lowdbConfig from './database/setup.js';

// set up express app
const app = express();
app.use(cors());
app.use(express.json());

// set up environment
dotenv.config();

lowdb = lowdbConfig()
await lowdb.read()

if (!lowdb.data){
    // boat slips base json
    const boatSlipsInit = [
        {
            slipNumber: 1,
            vacant: true,
            vesselName: undefined
        },
        {
            slipNumber: 2,
            vacant: true,
            vesselName: undefined
        },
        {
            slipNumber: 3,
            vacant: true,
            vesselName: undefined
        }
    ]
    lowdb.data = {boatSlips: boatSlipsInit}
}



app.get("/boat-slips", (req, res) => {
    res.json(lowdb.data.boatSlips)
    return
})


const listener = app.listen(process.env.PORT || 8080, () => {
    console.log('app is listening on port', listener.address().port)
});