import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { userRouter, incidentRouter, commentRouter } from './routes';

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/incidents', incidentRouter);
app.use('/comments', commentRouter);


app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
})
