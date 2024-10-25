'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from 'lucide-react'

const URL: string = process.env.NEXT_PUBLIC_API_URL as string;

function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(URL+'/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                alert('Error en el inicio de sesión');
                throw new Error('Error en el inicio de sesión');
            }

            const data = await response.json();
            if (data.status === 400) {
                alert(data.message);
                throw new Error(data.message);
            }
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userData', JSON.stringify(data.user));
            router.push('/app');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? 'Cargando...' : (
                        <>
                            <LogIn className="w-4 h-4 mr-2" />
                            Iniciar Sesión
                        </>
                    )}
                </Button>
            </div>
            <p className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <a className="text-blue-500 hover:underline" onClick={() => router.push('/register')}>
                    Regístrate
                </a>
            </p>
        </div>
    );
}

export default LoginScreen;