'use client';

import React from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"

const URL: string = process.env.NEXT_PUBLIC_API_URL as string;

const quizzes = [
    { name: 'Cuestionario 1', questions: 10, createdAt: '2023-01-01' },
    { name: 'Cuestionario 2', questions: 5, createdAt: '2023-02-01' },
    { name: 'Cuestionario 3', questions: 8, createdAt: '2023-03-01' },
];

function HomeScreen() {
    const router = useRouter();

    const user = JSON.parse(localStorage.getItem('userData') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Lista de Cuestionarios</h1>
                <button className="bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white px-4 py-2 rounded">+</button>
            </div>
            <p className="mb-4">Total de cuestionarios: {quizzes.length}</p>
            <ul className="space-y-4">
                {quizzes.map((quiz, index) => (
                    <li key={index} className="p-4 border rounded shadow">
                        <h2 className="text-xl font-semibold">{quiz.name}</h2>
                        <p>Preguntas: {quiz.questions}</p>
                        <p>Fecha de creación: {quiz.createdAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomeScreen;