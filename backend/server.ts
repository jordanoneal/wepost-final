import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;
;

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
})
