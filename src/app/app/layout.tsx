'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar'; // Ajusta la ruta según sea necesario

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    function logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        router.push('/');
    }

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
        <div>
            <nav className="flex w-full items-center justify-between p-4">
                <img src="/static/logot.png" alt="logo" className="h-16" />
                <Sidebar container="mobile-only" displayButton="btn">
                    <div className="flex flex-col w-full gap-4">
                        <div className='flex flex-col items-center gap-1'>
                            <div className='w-16 h-16 p-4 rounded-full bg-gray-100'>
                                <img src="https://static.vecteezy.com/system/resources/previews/033/882/148/non_2x/transparent-background-person-icon-free-png.png" alt="profile" className='' />
                            </div>
                            <span className='text-base'>
                                {userData?.name}
                            </span>
                        </div>
                        <a href="/profile" className="btn bg-gray-100 text-black border border-gray-300 px-4 py-2 rounded-lg">
                            <span>Mi perfil</span>
                        </a>
                    </div>
                    <div className="w-full h-px bg-gray-900/55 my-6"></div>
                    <ul className="flex flex-col gap-2">
                        <li className="mb-2">
                            <a href="/" className="flex items-center gap-2 text-lg">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                                <span>
                                    Inicio
                                </span>
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="/privacy" className="flex items-center gap-2 text-lg">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                                <span>
                                    Políticas de privacidad
                                </span>
                            </a>
                        </li>
                    </ul>
                    <div className="flex flex-col w-full gap-4 mt-auto py-6">
                        <button type="button" className="btn bg-red-500 text-white px-4 py-2 rounded-lg" onClick={logout}>
                            Cerrar sesión
                        </button>
                    </div>
                </Sidebar>
            </nav>
            <main>{children}</main>
        </div>
    );
}