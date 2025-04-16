'use client'

import {
    onAuthStateChanged,
    User,
    signOut as firebaseSignOut
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@libs/firebase'

interface AuthContextProps {
    user: User | null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    signOut: async () => {}
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signOut = async () => {
        await firebaseSignOut(auth)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
