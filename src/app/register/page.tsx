'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from 'lucide-react'

const URL: string = process.env.NEXT_PUBLIC_API_URL as string;

function RegisterScreen() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch(URL+'/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, lastname, email, password }),
            });

            if (!response.ok) {
                alert('Error en el registro');
                throw new Error('Error en el registro');
            }

            const data = await response.json();
            if (data.status === 400) {
                alert(data.message);
                throw new Error(data.message);
            }
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userData', JSON.stringify(data.user));
            router.push('/login');
        } catch (error) {
            console.error('Error:', error);
            // Manejar el error de registro aquí
        }
    };

    return (
        <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Registrarse</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastname">Apellido</Label>
                    <Input
                        id="lastname"
                        type="text"
                        placeholder="Tu apellido"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
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
                <Button className="w-full" onClick={handleRegister}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Registrarse
                </Button>
            </div>
            <p className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <a className="text-blue-500 hover:underline" onClick={() => router.push('/login')}>
                    Inicia sesión
                </a>
            </p>
        </div>
    );
}

export default RegisterScreen;