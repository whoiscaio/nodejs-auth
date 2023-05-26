import express from 'express';
import authRouter from './routes/authRouter';

const PORT = 3001;

const auth = express();

auth.use(express.json());
auth.use(authRouter);

auth.listen(PORT, () => {
  console.log(`🚀 Auth started at http://localhost:${PORT}`);
})
