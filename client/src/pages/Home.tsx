import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Contest {
    _id: string;
    name: string;
    description?: string;
    startTime: string;
    endTime: string;
    questions: string[];
}

const HomePage: React.FC = () => {
    const [contests, setContests] = useState<Contest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await axios.get('http://localhost:7070/api/contests');
                setContests(response.data);
                setLoading(false);
            } catch (err: any) {
                setError('Failed to fetch contests');
                setLoading(false);
            }
        };

        fetchContests();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Available Contests</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contests.map((contest) => (
                    <div
                        key={contest._id}
                        className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
                        onClick={() => navigate(`/contest/${contest._id}`)}
                    >
                        <h2 className="text-xl font-semibold mb-2">{contest.name}</h2>
                        {contest.description && (
                            <p className="text-gray-700 mb-4">{contest.description}</p>
                        )}
                        <p className="text-sm text-gray-500">
                            Start Time: {new Date(contest.startTime).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            End Time: {new Date(contest.endTime).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Questions: {contest.questions.length}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;