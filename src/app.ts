import express from 'express';
import dotenv from 'dotenv';
import appRouter from './routes/appRouter';

dotenv.config();

const PORT = 3000;

const app = express();

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`🔥 Server started at http://localhost:${PORT}`);
})
