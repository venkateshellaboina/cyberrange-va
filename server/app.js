import express from 'express';
import cors from 'cors';
import getVacantSlipNumber from './utils/util.js';
import lowdbConfig from './database/setup.js';

// set up express app
const app = express();
app.use(cors());
app.use(express.json());

let lowdb = lowdbConfig()
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

app.post("/boat-slips", async (req, res) => {
    const {body: {vesselName}} = req
    let boatSlips = lowdb.data.boatSlips
    let slipNumber = getVacantSlipNumber(boatSlips)

    if(slipNumber == -1){
        res.status(409).json({Message: "There are no available boat slips."})
        return
    }
    
    lowdb.data.boatSlips[slipNumber-1].vesselName = vesselName
    lowdb.data.boatSlips[slipNumber-1].vacant = false
    console.log(lowdb.data)

    await lowdb.write()

    res.json({slipNumber: slipNumber})
    return

})



app.put("/boat-slips/:slipNumber/vacate", async (req, res) => {
    let {params: {slipNumber}} = req
    slipNumber -= 1
    let isVacant = lowdb.data.boatSlips[slipNumber].vacant

    if(isVacant){
        let isVacantError = "Boat slip '" + slipNumber + "' is currently vacant"
        res.status(409).json({Message: isVacantError})
        return
    }

    lowdb.data.boatSlips[slipNumber].vacant = true
    lowdb.data.boatSlips[slipNumber].vesselName = undefined

    await lowdb.write()

    res.status(204).send()
    return
})



export default app