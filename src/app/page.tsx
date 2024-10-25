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

    const [userToken, setUserToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            setUserToken(token);
            const rToken = localStorage.getItem('refreshToken');
            setRefreshToken(rToken);
        }
    }, []);

    const handleAuth = async () => {
        try {
            if (!userToken) {
                return;
            }
            const response = await fetch(URL+'/api/auth', {
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
                alert('Error en la autenticación');
                throw new Error('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    handleAuth();
    
    return (
        <div className="p-8 space-y-6 text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                <Home className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Bienvenido a Mi App</h1>
            <div className="space-y-4">
                <Button className="w-full">
                    <Link href="/login" className="w-full">Iniciar Sesión</Link>
                </Button>
                <Button className="w-full" variant="outline">
                    <Link href="/register" className="w-full">Registrarse</Link>
                </Button>
            </div>
        </div>
    )
}

export default StartScreen;