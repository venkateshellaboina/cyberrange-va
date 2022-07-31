import app from "./app.js";
import dotenv from 'dotenv';

// set up environment
dotenv.config();

app.listen(process.env.PORT || 8080, () => {
    console.log('app is listening on port', process.env.PORT || 8080)
});