import { db } from './firebase'
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { auth } from './firebase';

// Obtener datos del usuario
export const getUserProfile = async (uid: string) => {
    const ref = doc(db, 'users', uid)
    const snap = await getDoc(ref)
    return snap.exists() ? snap.data() : null
}

// Crear o actualizar perfil
export const saveUserProfile = async (
        uid: string,
        data: {
            firstName?: string
            lastName?: string
            phone?: string
        }
    ) => {
        const user = auth.currentUser
        if (!user) throw new Error("No user logged in")

        const ref = doc(db, 'users', uid)
        return setDoc(ref, {
            ...data,
            email: user.email,
        }, { merge: true })
}

// Eliminar perfil (de Firestore)
export const deleteUserProfile = async (uid: string) => {
    const ref = doc(db, 'users', uid)
    return deleteDoc(ref)
}

// Eliminar cuenta de Firebase Auth
export const deleteUserAccount = async () => {
    if (!auth.currentUser) throw new Error('No user logged in')
    return auth.currentUser.delete()
}
