import express from 'express';
import cors from 'cors';
import getVacantSlipNumber from './utils/util.js';
import lowdbInit from './database/setup.js';
import { boatSlipsInit } from './database/boatSlipsBase.js';
import { NO_AVAILABLE_BOAT_SLIP, BOAT_SLIP_VACANT, BOAT_SLIP_NOT_FOUND, URI_GET_BOATSLIPS, URI_POST_BOATSLIPS, URI_PUT_BOATSLIP } from './constants/constants.js'

// set up express app
const app = express();
app.use(cors());
app.use(express.json());

const initiateBoatSlipsData = async (lowdb) => {
    //check if the current environment is 'test'
    if (!lowdb.data || !(process.env.JEST_WORKER_ID === undefined || process.env.NODE_ENV !== 'test')){
        lowdb.data = {boatSlips: boatSlipsInit}
    }
    return lowdb
}

let lowdb = await lowdbInit()
lowdb = await initiateBoatSlipsData(lowdb)

app.get(URI_GET_BOATSLIPS, (req, res) => {
    res.status(200).json(lowdb.data.boatSlips)
    return
})

app.post(URI_POST_BOATSLIPS, async (req, res) => {
    const {body: {vesselName}} = req
    let boatSlips = lowdb.data.boatSlips
    let slipNumber = getVacantSlipNumber(boatSlips)

    if(slipNumber == -1){
        res.status(409).json({statusCode: 409, Message: NO_AVAILABLE_BOAT_SLIP})
        return
    }
    
    lowdb.data.boatSlips[slipNumber-1].vesselName = vesselName
    lowdb.data.boatSlips[slipNumber-1].vacant = false

    await lowdb.write()

    res.status(200).json({slipNumber: slipNumber})
    return
})



app.put(URI_PUT_BOATSLIP, async (req, res) => {
    let {params: {slipNumber}} = req
    if(slipNumber < 1 || slipNumber > 3){
        let notFoundError = BOAT_SLIP_NOT_FOUND.replace('x', slipNumber)
        res.status(404).json({statusCode: 404, Message: notFoundError})
        return
    }
    let isVacant = lowdb.data.boatSlips[slipNumber-1].vacant

    if(isVacant){
        let isVacantError = BOAT_SLIP_VACANT.replace('x', slipNumber) 
        res.status(409).json({statusCode: 409, Message: isVacantError})
        return
    }

    lowdb.data.boatSlips[slipNumber-1].vacant = true
    lowdb.data.boatSlips[slipNumber-1].vesselName = undefined

    await lowdb.write()

    res.status(204).send()
    return
})


export default app