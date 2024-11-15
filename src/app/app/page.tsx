'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const URL: string = process.env.NEXT_PUBLIC_API_URL as string;

const quizzes = [
    { _id: '0', name: 'Cuestionario 1', questions: 10, createdAt: '2023-01-01' },
    { _id: '1', name: 'Cuestionario 2', questions: 5, createdAt: '2023-02-01' },
    { _id: '2', name: 'Cuestionario 3', questions: 8, createdAt: '2023-03-01' },
];

function HomeScreen() {
    const [userData, setUserData] = useState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('userData');
            if (data) {
                setUserData(JSON.parse(data));
            }
        }
    }, []);
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Lista de Cuestionarios</h1>
                <Link href="/app/create" className="btn bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white px-4 py-2 rounded">+</Link>
            </div>
            <p className="mb-4">Total de cuestionarios: {quizzes.length}</p>
            <ul className="flex flex-col gap-4">
                {quizzes.map((quiz, index) => (
                    <Link key={index} href={`/app/quiz/${quiz._id}`} className="w-full">
                        <li key={index} className="p-4 border rounded shadow flex justify-between items-center cursor-pointer">
                            <div>
                                <h2 className="text-xl font-semibold">{quiz.name}</h2>
                                <p>Preguntas: {quiz.questions}</p>
                                <p>Fecha de creación: {quiz.createdAt}</p>
                            </div>
                            <div className="text-gray-500 hover:text-gray-700">
                                <span className="material-symbols-outlined text-3xl">arrow_forward</span>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default HomeScreen;