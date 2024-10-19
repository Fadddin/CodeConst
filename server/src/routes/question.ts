import express, { Request, Response } from 'express';
import Question from '../models/Question';
import Contest from '../models/Contest';
import { IQuestion } from '../models/Question'; // Assuming you have an interface for the Question model
const router = express.Router();

// Add a question to a contest
router.post('/:contestId', async (req: Request<{ contestId: string }, {}, IQuestion>, res: Response) => {
    try {
        const { contestId } = req.params;
        const { title, description, inputFormat, outputFormat, constraints, testCases, points } = req.body;
        const question = new Question({ title, description, inputFormat, outputFormat, constraints, testCases, points });
        await question.save();

        // Update contest with the question
        await Contest.findByIdAndUpdate(contestId, { $push: { questions: question._id } });
        res.status(201).json(question);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// Get questions for a contest
router.get('/:contestId', async (req: any, res: any) => {
    try {
        const { contestId } = req.params;
        const contest = await Contest.findById(contestId).populate('questions');
        if (!contest) {
            return res.status(404).json({ error: 'Contest not found' });
        }
        res.json(contest.questions);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
