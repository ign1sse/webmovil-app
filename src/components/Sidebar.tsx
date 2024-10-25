'use client';

import React, { useState, useEffect } from 'react';

const Sidebar = ({ container = '', displayButton = '', children }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const buttons = document.querySelectorAll('button, a');
        const handleClick = (event) => {
            if (open && event.target.id !== 'menu-button') {
                toggleMenu();
            }
        };

        // buttons.forEach((button) => {
        //     button.addEventListener('click', handleClick);
        // });

        return () => {
            buttons.forEach((button) => {
                button.removeEventListener('click', handleClick);
            });
        };
    }, [open]);

    return (
        <div className={`relative inline-flex ${container}`}>
            {/* Botón para abrir/cerrar el menú */}
            <button
                onClick={toggleMenu}
                id="menu-button"
                className={`btn p-0 ${displayButton}`}
            >
                <span className="material-symbols-outlined text-3xl">
                    menu
                </span>
            </button>

            {/* Menú lateral */}
            <div
                className={`flex flex-col fixed top-0 right-0 h-full bg-white text-black shadow-xl z-100 transform transition-transform duration-300 ${open ? '' : 'translate-x-full'}`}
                style={{ width: '275px', maxWidth: '100%' }}
            >
                <div className="flex w-full items-center justify-between p-6 mb-1">
                    <h2 className="h2 font-semibold">
                        Menú
                    </h2>
                    <button type="button" onClick={toggleMenu} className="btn p-0">
                        <span className="material-symbols-outlined text-2xl">
                            close
                        </span>
                    </button>
                </div>
                <div className="flex flex-col px-6 py-0 h-full">
                    {/* Aquí es donde se mostrará el contenido pasado como hijo */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;