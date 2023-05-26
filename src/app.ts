import express from 'express';
import appRouter from './routes/appRouter';

const PORT = 3000;

const app = express();

app.use(appRouter);

app.listen(PORT, () => {
  console.log(`🔥 Server started at http://localhost:${PORT}`);
})
