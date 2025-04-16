'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
// Icons
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiPlus, FiGithub } from "react-icons/fi";
import { PiQrCodeBold } from "react-icons/pi";
import { LuUserRound } from "react-icons/lu";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuClick = () => {
        setIsOpen(false);
    };

    const forceMobile = pathname === '/dashboard/qr-generator';

    return (
        <section className="relative shadow">
            {/* Barra superior para resoluciones pequeñas */}
            <div className={`fixed top-0 left-0 w-full bg-white text-black flex items-center justify-between px-4 h-14 z-50 shadow border-b-[#d1d5db] ${!forceMobile ? 'md:hidden' : ''}`}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/qr_koala_logo.png"
                        alt="Logo QR Koala"
                        loading="lazy"
                        width={28}
                        height={28}
                    />
                    <span className="text-lg font-bold">QR KOALA</span>
                </Link>
                {/* Botón para abrir/cerrar el menú */}
                <button
                    onClick={toggleMenu}
                    className="p-2 rounded-md focus:outline-none"
                >
                    {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Menú desplegable para resoluciones pequeñas */}
            {isOpen && (
                <div className={`absolute top-0 left-0 w-screen h-[90vh] bg-white shadow-md z-40 mt-14 ${!forceMobile ? 'md:hidden' : ''}`}>
                    <nav className="space-y-2 text-gray-400 text-sm py-4">
                        <Link
                            href="/dashboard/qr-generator"
                            onClick={handleMenuClick}
                            className={`block px-5 py-2 hover:text-gray-600 ${
                                pathname === '/dashboard/qr-generator' ? 'text-black bg-[#e6f1fe]' : ''
                            }`}
                        >
                            <FiPlus className="inline-block mr-2" size={20} />
                            Crear un nuevo código QR
                        </Link>
                        <Link
                            href="/dashboard/qr"
                            onClick={handleMenuClick}
                            className={`block px-5 py-2 hover:text-gray-600 ${
                                pathname === '/dashboard/qr' ? 'text-black bg-[#e6f1fe]' : ''
                            }`}
                        >
                            <PiQrCodeBold className="inline-block mr-2" size={20} />
                            Mis códigos QR
                        </Link>
                        <Link
                            href="/dashboard/account"
                            onClick={handleMenuClick}
                            className={`block px-5 py-2 hover:text-gray-600 ${
                                pathname === '/dashboard/account' ? 'text-black bg-[#e6f1fe]' : ''
                            }`}
                        >
                            <LuUserRound className="inline-block mr-2" size={20} />
                            Cuenta
                        </Link>
                        <hr className="border-gray-300" />
                        <Link
                            href="https://github.com/Tensangelo/Qr-Koala"
                            target="_blank"
                            onClick={handleMenuClick}
                            className="block px-5 py-2 hover:text-gray-600"
                        >
                            <FiGithub className="inline-block mr-2" size={20} />
                            Github
                        </Link>
                    </nav>
                </div>
            )}

            {/* Menú lateral para resoluciones grandes */}
            <div className={`${!forceMobile ? 'hidden md:static md:flex' : 'hidden'} flex-col top-0 left-0 h-full md:h-screen shadow-lg py-5 w-[18rem] bg-white border-[#d1d5db] z-40`}>
                <div>
                    {/* Logo en el menú lateral */}
                    <Link
                        className="hidden md:flex text-xl font-black mb-8 pl-5 items-center gap-2 text-black font-nokora"
                        href="/"
                    >
                        <Image
                            src="/images/qr_koala_logo.png"
                            alt="Logo QR Koala"
                            loading="lazy"
                            width={28}
                            height={28}
                        />
                        QR KOALA
                    </Link>
                    <nav className="space-y-2 text-gray-400 text-sm">
                        <Link
                            href="/dashboard/qr-generator"
                            className={`flex justify-start items-center pl-5 h-[36px] hover:text-gray-600 ${
                                pathname === '/dashboard/qr-generator' ? 'text-black bg-[#e6f1fe] border-r-2 border-black' : ''
                            }`}
                        >
                            <FiPlus className="mr-2" size={20} />
                            Crear un nuevo código QR
                        </Link>
                        <Link
                            href="/dashboard/qr"
                            className={`flex justify-start items-center pl-5 h-[36px] hover:text-gray-600 ${
                                pathname === '/dashboard/qr' ? 'text-black bg-[#e6f1fe] border-r-2 border-black' : ''
                            }`}
                        >
                            <PiQrCodeBold className="mr-2" size={20} />
                            Mis códigos QR
                        </Link>
                        <Link
                            href="/dashboard/account"
                            className={`flex justify-start items-center pl-5 h-[36px] hover:text-gray-600 ${
                                pathname === '/dashboard/account' ? 'text-black bg-[#e6f1fe] border-r-2 border-black' : ''
                            }`}
                        >
                            <LuUserRound className="mr-2" size={20} />
                            Cuenta
                        </Link>
                        <hr className="border-gray-300" />
                        <Link
                            href="/"
                            target="_blank"
                            className="flex justify-start items-center pl-5 h-[36px] hover:text-gray-600"
                        >
                            <FiGithub className="mr-2" size={20} />
                            Github
                        </Link>
                    </nav>
                </div>
            </div>
        </section>
    );
}