'use client'

import { Loading } from '@components/loading';
import { useAuth } from '@contexts/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Navbar from '@components/navbar/navbar';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [loading, user, router])

    if (loading || !user) {
        return <Loading message="Cargando..." />
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
