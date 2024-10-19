import express , {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth';
import contestRouter from './routes/contest';
import questionRouter from './routes/question';
import submissionRouter from './routes/submission';
import executionRouter from './routes/execution';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || '')
    .then(() => console.log('MongoDB connected'))
    .catch((err: Error) => console.error('MongoDB connection error:', err));

    app.get('/', (req: Request, res: Response) => {
        res.send('Coding Contest Platform API');
    });

    app.use('/api/auth', authRouter);
    app.use('/api/contests', contestRouter);
    app.use('/api/questions', questionRouter);
    app.use('/api/submissions', submissionRouter);
    app.use('/api/execution', executionRouter);
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });