'use client'

import { useState } from "react";
import Image from "next/image";
// Auth
import { sendMagicLink } from "@libs/auth";
// UI Components
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Label } from "@components/ui/label";
import { toast } from "sonner";
// Icons
import { Dots } from "@assets/icons/dots";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Por favor, ingresa un correo válido.")
            return
        }
        setError("");
        setIsLoading(true);

        try {
            await sendMagicLink(email)
            toast.success(
                isRegister
                    ? "Enlace de registro enviado. Revisa tu correo. Puede que se envie a la bandeja de spam."
                    : "Enlace de inicio de sesión enviado. Revisa tu correo. Revisa tu correo. Puede que se envie a la bandeja de spam."
            )
        } catch (error) {
            console.error(error)
            toast.error("Hubo un error al enviar el enlace. Inténtalo de nuevo.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen px-4 relative">
            <div className="absolute top-10 left-8 flex justify-start items-center h-fit">
                <picture>
                    <source media="(max-width: 768px)" srcSet="/images/qr_koala_logo.png" />
                    <Image
                        src="/images/qr_koala_logo_large.png"
                        alt='Logo QR Koala'
                        loading='lazy'
                        width={28}
                        height={28}
                    />
                </picture>
                <p className="uppercase text-xl font-black font-nokora ml-2">QR KOALA</p>
            </div>
            <Card className="w-full max-w-md h-[346px]">
                <CardContent className="p-6 space-y-4 h-full flex flex-col justify-around">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-left">
                            {isRegister ? "Regístrate" : "Inicia sesión"}
                        </h1>
                        <p className="text-left text-xs font-medium text-[#4d4842] mt-2">
                            {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
                            <button
                                type="button"
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-blue-500 underline cursor-pointer"
                            >
                                {isRegister ? "Inicia sesión" : "¡Únete!"}
                            </button>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <Label
                            htmlFor="email"
                            className="block text-sm text-gray-500 font-semibold mb-2"
                        >
                            Correo electrónico
                            <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="off"
                            disabled={isLoading}
                            className={`appearance-none rounded-lg w-full py-3 px-3 text-gray-900 leading-5 mb-1 border ${
                                error ? "border-red-500" : "border-gray-300"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-1 mb-2">{error}</p>
                        )}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full font-normal text-sm md:text-base mt-5 h-[46px] py-3 px-4"
                        >
                            {isLoading ? (
                                <>
                                    <Dots className="w-5 h-5 mr-2" colorPrimary="#ffffff" />
                                    Cargando...
                                </>
                            ) : isRegister ? (
                                "Regístrese con correo electrónico"
                            ) : (
                                "Iniciar sesión con correo electrónico"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage;