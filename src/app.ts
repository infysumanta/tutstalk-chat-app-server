import express from 'express';
import cors from 'cors';
import http from 'http';
import { connectDB } from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import mainRouter from './routes/index.routes';
import socketServer from './socket';

const app = express();
const server = http.createServer(app);
socketServer(server);
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('API is running');
});

app.use('/api/v1', mainRouter);

app.use(notFound);
app.use(errorHandler);

export default server;
