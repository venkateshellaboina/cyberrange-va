import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';
import { dirname, join } from 'path';

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
    await lowdb.read()

    return lowdb
}

export default lowdbInit;