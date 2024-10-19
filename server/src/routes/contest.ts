import express, { Request, Response } from 'express';
import Contest from '../models/Contest'; 
import { IContest } from '../models/Contest'; 
const router = express.Router();

// Create a contest
router.post('/create', async (req: Request, res: Response) => {
    try {
        const { name, description, startTime, endTime } = req.body;
        const contest: IContest = new Contest({ name, description, startTime, endTime });
        await contest.save();
        res.status(201).json(contest);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Get all contests
router.get('/', async (req: Request, res: Response) => {
    try {
        const contests = await Contest.find();
        res.json(contests);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
