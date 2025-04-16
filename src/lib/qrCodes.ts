import { db } from './firebase'
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
    serverTimestamp,
    orderBy,
    limit,
    Timestamp
} from 'firebase/firestore'

export type QRDesign = {
    foregroundColor: string;
    backgroundColor: string;
    level: "L" | "M" | "Q" | "H";
    image: boolean;
    imageSettings?: {
        src: string;
        height: number;
        width: number;
        opacity: number;
        excavate: boolean;
    };
    qrSize: number;
}

export type QRCode = {
    id?: string;
    uid: string;
    name: string;
    url: string;
    title: string;
    type: 'website';
    data: string;
    isActive: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    scanCount: number;
    design: QRDesign;
}

// Crear nuevo QR
export const createQRCode = async (
    data: Omit<QRCode, 'createdAt' | 'updatedAt' | 'scanCount'>
) => {
    const ref = collection(db, 'qrcodes')
    return addDoc(ref, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        scanCount: 0
    })
}

// Obtener todos los QR de un usuario (máx 5)
export const getUserQRCodes = async (uid: string) => {
    const ref = collection(db, 'qrcodes')
    const q = query(ref, where('uid', '==', uid), orderBy('createdAt', 'desc'), limit(5))
    const snap = await getDocs(q)
    return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as QRCode[]
}

// Actualizar QR (por ID)
export const updateQRCode = async (id: string, data: Partial<QRCode>) => {
    const ref = doc(db, 'qrcodes', id)
    return updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp()
    })
}

// Eliminar QR (si decides permitirlo)
export const deleteQRCode = async (id: string) => {
    const ref = doc(db, 'qrcodes', id)
    return deleteDoc(ref)
}
