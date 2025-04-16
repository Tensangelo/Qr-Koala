'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
// Context
import { useAuth } from '@contexts/authContext';
// Libs
import {
    getUserProfile,
    saveUserProfile,
    deleteUserProfile,
    deleteUserAccount,
} from '@libs/user';
// Ui Components
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Label } from '@components/ui/label';
// Components
import { Loading } from '@components/loading';
// Icons
import { RxExit } from 'react-icons/rx';
import { GoTrash } from 'react-icons/go';
import { Dots } from '@assets/icons/dots';

const Account = () => {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const profile = await getUserProfile(user.uid);

                // Actualizar el formulario solo si hay cambios en el perfil
                setFormData({
                    firstName: profile?.firstName ?? '',
                    lastName: profile?.lastName ?? '',
                    phone: profile?.phone ?? '',
                    email: user.email ?? '',
                });
            }
        };

        if (!loading && user) fetchData();
    }, [user, loading]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await saveUserProfile(user.uid, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
            });
            toast.success('Perfil actualizado');
        } catch (error) {
            toast.error('Error al guardar');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        toast.info('Sesión cerrada');
        router.push('/login');
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        const confirm = window.confirm(
            '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.'
        );
        if (!confirm) return;

        try {
            await deleteUserProfile(user.uid);
            await deleteUserAccount();
            toast.success('Cuenta eliminada');
            router.push('/login');
        } catch (error) {
            if ((error as { code: string }).code === 'auth/requires-recent-login') {
                toast.error('Por seguridad, vuelve a iniciar sesión antes de eliminar la cuenta.');
            } else {
                toast.error('Error al eliminar la cuenta');
                console.error(error);
            }
        }
    };

    if (loading) {
        return <Loading message='Cargando...' />
    }

    return (
        <div className="flex flex-col justify-start items-start w-full min-h-screen px-4 py-5">
            <h1 className="text-xl md:text-2xl font-bold">Cuenta</h1>
            <Card className="w-full p-5 mt-5 shadow rounded-md border-[#d1d5db]">
                <h3 className="text-lg font-bold">Información personal</h3>
                <CardContent className="space-y-4 px-0">
                    <form
                        className="space-y-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <Label
                                    htmlFor="name"
                                    className="block text-base text-gray-500 font-semibold mb-2"
                                >
                                    Nombre
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Por ejemplo, Juan"
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, firstName: e.target.value })
                                    }
                                    autoComplete="off"
                                    className="h-[46px] !text-[16px] appearance-none rounded-lg w-full py-3 px-3 text-gray-900 leading-5 border border-gray-300"
                                    disabled={saving}
                                />
                            </div>
                            <div className="w-full">
                                <Label
                                    htmlFor="lastName"
                                    className="block text-base text-gray-500 font-semibold mb-2"
                                >
                                    Apellido
                                </Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Por ejemplo, Thompson"
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, lastName: e.target.value })
                                    }
                                    autoComplete="off"
                                    className="h-[46px] !text-[16px] appearance-none rounded-lg w-full py-3 px-3 text-gray-900 leading-5 border border-gray-300"
                                    disabled={saving}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-full">
                                <Label
                                    htmlFor="email"
                                    className="block text-base text-gray-500 font-semibold mb-2"
                                >
                                    Correo electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Correo"
                                    value={formData.email}
                                    autoComplete="off"
                                    disabled
                                    className="h-[46px] !text-[16px] appearance-none rounded-lg w-full py-3 px-3 text-gray-900 leading-5 border border-gray-300"
                                />
                            </div>
                            <div className="w-full">
                                <Label
                                    htmlFor="phone"
                                    className="block text-base text-gray-500 font-semibold mb-2"
                                >
                                    Teléfono
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Por ejemplo, +34 123 456 789"
                                    pattern="^\+?\d{0,3}?\s?\(?\d{1,4}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    autoComplete="off"
                                    className="h-[46px] !text-[16px] appearance-none rounded-lg w-full py-3 px-3 text-gray-900 leading-5 border border-gray-300"
                                    disabled={saving}
                                />
                            </div>
                        </div>
                        <Button
                            className="text-base font-normal rounded-[5px] px-6 h-12 cursor-pointer"
                            type='submit'
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <Dots className="w-5 h-5 mr-2" colorPrimary="#ffffff" />
                                    Guardando...
                                </>
                            ) : 'Actualizar'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Card className="w-full p-5 mt-5 shadow rounded-md border-[#d1d5db]">
                <CardContent className="space-y-4 px-0">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            disabled={saving}
                            className="text-base font-normal rounded-[5px] px-6 h-12 cursor-pointer border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 ease-in-out"
                        >
                            <RxExit className="rotate-180" />
                            Cerrar sesión
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            disabled={saving}
                            className="bg-white text-base text-red-600 font-normal rounded-[5px] px-6 h-12 cursor-pointer border-2 border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200 ease-in-out"
                        >
                            <GoTrash />
                            Eliminar cuenta
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Account;