import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';
import { dirname, join } from 'path';

const initiateLowdb = async (lowdb) => {
    await lowdb.read()
    //check if the current environment is 'test'
    if (!lowdb.data || !(process.env.JEST_WORKER_ID === undefined || process.env.NODE_ENV !== 'test')){
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
    return lowdb
}

// set up low
const lowdbInit = async () => {
    let database = ""
    if(process.env.JEST_WORKER_ID === undefined || process.env.NODE_ENV !== 'test'){
        database = join(dirname(fileURLToPath(import.meta.url)), './database.json');
    }
    else{
        database = join(dirname(fileURLToPath(import.meta.url)), './database.test.json');
    }
    console.log(database)
    const jsonAdapter = new JSONFile(database);
    let lowdb = new Low(jsonAdapter);
    lowdb = await initiateLowdb(lowdb)
    return lowdb
}

export default lowdbInit;