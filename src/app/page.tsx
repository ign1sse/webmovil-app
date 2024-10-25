'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Home } from 'lucide-react'

// Options
// - http://localhost:5173
// - http://localhost:4173
// - https://webmovil-server.vercel.app
const URL: string = process.env.NEXT_PUBLIC_API_URL as string;

function StartScreen() {
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const handleAuth = async () => {
        console.log('Authenticating...');
        try {
            const userToken = localStorage.getItem('authToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!userToken) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            const response = await fetch(URL + '/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userToken, refreshToken }),
            });

            const data = await response.json();
            if (data.status === 200) {
                localStorage.setItem('userData', JSON.stringify(data.user));
                if (data.accessToken) {
                    localStorage.setItem('authToken', data.accessToken);
                }
                router.push('/app');
            } else if (data.status === 400) {
                setIsAuthenticated(false);
                setIsLoading(false);
                throw new Error('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error:', error);
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            handleAuth();
        }
    }, []);

    return (
        <div className="p-8 space-y-6 text-center">
            <div className="mx-auto flex items-center justify-center">
                <img src="/static/logot.png" alt="logo" className="h-24" />
            </div>
            { !isLoading && !isAuthenticated && (
                <>
                    {/* Mostrar lo de abajo sólo si no se pudo autenticar */}
                    <h1 className="text-2xl font-bold">Quizzes</h1>
                    <div className="flex flex-col gap-2">
                        <Link href="/login" className="flex justify-center w-full bg-gradient-to-br from-orange-500 to-fuchsia-600 text-white text-center px-4 py-2 rounded-lg">Iniciar Sesión</Link>
                        <Link href="/register" className="flex justify-center w-full border border-gray-500 text-black text-center px-4 py-2 rounded-lg">Registrarse</Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default StartScreen;