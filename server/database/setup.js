import { fileURLToPath } from 'url';
import { Low, JSONFile } from 'lowdb';
import { dirname, join } from 'path';

// set up low
const lowdbConfig = () => {
    const database = join(dirname(fileURLToPath(import.meta.url)), './database.json');
    const jsonAdapter = new JSONFile(database);
    const lowdb = new Low(jsonAdapter);
    return lowdb
}

export default lowdbConfig;