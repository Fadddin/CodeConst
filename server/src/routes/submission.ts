import express, { Request, Response } from 'express';
import axios from 'axios';
import Submission from '../models/Submission';
import Question from '../models/Question';
import { IQuestion } from '../models/Question';
const router = express.Router();

// Type definitions for the request body
interface SubmissionRequestBody {
    user: string;
    contest: string;
    question: string;
    code: string;
    language: string;
}

// Add submission route
router.post('/', async (req: Request<{}, {}, SubmissionRequestBody>, res: any) => {
    const { user, contest, question, code, language } = req.body;

    try {
        const questionData = await Question.findById(question) as IQuestion | null;
        if (!questionData) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const testCases = questionData.testCases;
        let passedAll = true;
        let totalScore = 0;

        // Iterate over all test cases
        for (const testCase of testCases) {
            const { input, output: expectedOutput } = testCase;

            // Call the execution service
            const response = await axios.post('http://localhost:7070/api/execution/execute', {
                code,
                language,
                input
            });
            console.log('Execution Response:', response.data); 

            if (response.data.output !== expectedOutput) {
                passedAll = false;
                break;
            }
        }

        // Update score based on test case results
        totalScore = passedAll ? questionData.points : 0;

        const submission = new Submission({
            user,
            contest,
            question,
            code,
            language,
            result: passedAll ? 'pass' : 'fail',
            score: totalScore
        });

        await submission.save();
        res.status(201).json(submission);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
