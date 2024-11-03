import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ITestCase {
    input: string;
    output: string;
}

interface IQuestion {
    _id: string;
    title: string;
    description: string;
    inputFormat: string;
    outputFormat: string;
    constraints?: string;
    testCases: ITestCase[];
    points: number;
}

const QuestionsPage: React.FC = () => {
    const { contestId } = useParams<{ contestId: string }>();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:7070/api/questions/${contestId}`);
                setQuestions(response.data);
                setLoading(false);
            } catch (err: any) {
                setError('Failed to fetch questions');
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [contestId]);

    const handleQuestionClick = (questionId: string) => {
        navigate(`/code/${contestId}/${questionId}`);
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Questions</h1>
            {questions.length === 0 ? (
                <p className="text-center">No questions available for this contest.</p>
            ) : (
                <ul className="space-y-4">
                    {questions.map((question) => (
                        <li
                            key={question._id}
                            onClick={() => handleQuestionClick(question._id)}
                            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
                            <p className="text-gray-700 mb-4">{question.description}</p>
                            <p className="text-sm text-gray-500 mb-2">
                                Input Format: {question.inputFormat}
                            </p>
                            <p className="text-sm text-gray-500 mb-2">
                                Output Format: {question.outputFormat}
                            </p>
                            {question.constraints && (
                                <p className="text-sm text-gray-500 mb-2">
                                    Constraints: {question.constraints}
                                </p>
                            )}
                            <p className="text-sm text-gray-500">
                                Points: {question.points}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default QuestionsPage;
