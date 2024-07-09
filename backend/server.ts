import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { userRouter, incidentRouter, commentRouter, authRouter } from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001'
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/incidents', incidentRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);


app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
})
