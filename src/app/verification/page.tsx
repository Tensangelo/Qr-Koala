'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Libs
import { completeMagicLinkSignIn, createUserInFirestoreIfNotExists } from "@libs/auth";
// Components
import { Loading } from "@components/loading";

export default function FinishSigninPage() {
    const router = useRouter()
    const [message, setMessage] = useState("Procesando...")

    useEffect(() => {
        const url = window.location.href

        const completeSignIn = async () => {
        try {
            const user = await completeMagicLinkSignIn(url)

            // Verificar si el correo está confirmado
            if (!user.emailVerified) {
                setMessage("Tu correo no está verificado. Por favor verifica tu email.")
                return
            }

            // Crear el documento en Firestore solo si es la primera vez
            await createUserInFirestoreIfNotExists(user)

            setMessage("Cargando...")
            router.push("/dashboard/qr")
        } catch (error) {
            console.error(error)
            setMessage("Error al completar el login. Intenta de nuevo.")
        }
    }

        completeSignIn()
    }, [router])

    return (
        <Loading message={message} />
    )
}
