'use client';

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn, UserPlus, Home } from 'lucide-react'

type SetCurrentScreen = (screen: string) => void;

export default function MobileApp() {
    const [currentScreen, setCurrentScreen] = useState('start')

    const renderScreen = () => {
        switch (currentScreen) {
            case 'start':
                return <StartScreen setCurrentScreen={setCurrentScreen} />
            case 'login':
                return <LoginScreen setCurrentScreen={setCurrentScreen} />
            case 'register':
                return <RegisterScreen setCurrentScreen={setCurrentScreen} />
            case 'home':
                return <HomeScreen setCurrentScreen={setCurrentScreen} />
            default:
                return <StartScreen setCurrentScreen={setCurrentScreen} />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
                {renderScreen()}
            </div>
        </div>
    )
}

function StartScreen({ setCurrentScreen }: { setCurrentScreen: SetCurrentScreen }) {
    return (
        <div className="p-8 space-y-6 text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                <Home className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Bienvenido a Mi App</h1>
            <div className="space-y-4">
                <Button className="w-full" onClick={() => setCurrentScreen('login')}>Iniciar Sesión</Button>
                <Button className="w-full" variant="outline" onClick={() => setCurrentScreen('register')}>Registrarse</Button>
            </div>
        </div>
    )
}

function LoginScreen({ setCurrentScreen }: { setCurrentScreen: SetCurrentScreen }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Error en el inicio de sesión');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            setCurrentScreen('home');
        } catch (error) {
            console.error('Error:', error);
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
                <Button className="w-full" onClick={handleLogin}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                </Button>
            </div>
            <p className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <a className="text-blue-500 hover:underline" onClick={() => setCurrentScreen('register')}>
                    Regístrate
                </a>
            </p>
        </div>
    );
}

function RegisterScreen({ setCurrentScreen }: { setCurrentScreen: SetCurrentScreen }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            setCurrentScreen('home');
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
                <a className="text-blue-500 hover:underline" onClick={() => setCurrentScreen('login')}>
                    Inicia sesión
                </a>
            </p>
        </div>
    );
}

function HomeScreen({ setCurrentScreen }: { setCurrentScreen: SetCurrentScreen }) {
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setCurrentScreen('start');
    };

    return (
        <div className="p-8 space-y-6 text-center">
            <h2 className="text-2xl font-bold">Home Page</h2>
            <p>Bienvenido a la página principal de la aplicación.</p>
            <Button variant="outline" onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
    );
}