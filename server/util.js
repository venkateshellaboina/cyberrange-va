const getVacantSlipNumber = (boatSlips) => {
    let slipNumber = -1
    for(let slip in boatSlips){
        if(boatSlips[slip].vacant){
            slipNumber = boatSlips[slip].slipNumber
            break
        }
    }
    return slipNumber
}

export default getVacantSlipNumber;