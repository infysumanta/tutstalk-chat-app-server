import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import mainRouter from './routes/index.routes';

const app = express();
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

export default app;
