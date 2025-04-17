"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { QRCodeCanvas } from "qrcode.react";
// Components UI
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Switch } from "@components/ui/switch";
import { Label } from "@components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { auth } from "@libs/firebase";
// Libs
import { getUserQRCodes, updateQRCode, deleteQRCode, QRCode } from "@libs/qrCodes";
// Icons
import { FaPlus } from "react-icons/fa6";
import { TfiWorld } from "react-icons/tfi";
import { BsDownload } from "react-icons/bs";
import { MoreHorizontal } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";

export default function QRDashboardPage() {
    const router = useRouter();
    const [qrs, setQrs] = useState<QRCode[]>([]);
    const [filtered, setFiltered] = useState<QRCode[]>([]);
    const [search, setSearch] = useState("");
    const [showActive, setShowActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingQR, setLoadingQR] = useState<string | null>(null);

    const fetchQRCodes = async () => {
        const user = auth.currentUser;

        if (!user) return toast.error("Usuario no autenticado.");
        setLoading(true);

        try {
            const codes = await getUserQRCodes(user.uid);
            setQrs(codes);
            setFiltered(codes);
        } catch (err) {
            toast.error("Error al cargar códigos QR.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQRCodes();
    }, []);

    useEffect(() => {
        const filteredData = qrs.filter(
            (qr) =>
                (qr.title?.toLowerCase().includes(search.toLowerCase()) ?? false) &&
                qr.isActive === showActive
        );
        setFiltered(filteredData);
    }, [search, showActive, qrs]);

    const handleToggleActive = async (qr: QRCode) => {
        setLoadingQR(qr.id ?? null);

        try {
            await updateQRCode(qr.id!, { isActive: !qr.isActive });
            toast.success(`Código ${qr.isActive ? "desactivado" : "activado"}.`);
            fetchQRCodes();
        } catch (err) {
            toast.error("Error al cambiar el estado.");
        } finally {
            setLoadingQR(null);
        }
    };

    const handleDelete = async (qr: QRCode) => {
        try {
            await deleteQRCode(qr.id!);
            toast.success("Código eliminado permanentemente.");
            fetchQRCodes();
        } catch (err) {
            toast.error("Error al eliminar.");
        }
    };

    const handleDownload = (qr: QRCode) => {
        const canvas = document.getElementById(`qr-${qr.id}`) as HTMLCanvasElement;
        if (!canvas) return toast.error("QR no encontrado.");

        // Usa una imagen local desde la carpeta public
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement("a");
        link.href = pngUrl;

        // Usa un nombre por defecto si el título está vacío o es solo espacios
        const title = qr.title?.trim() || "mi_codigo_qr";

        link.download = `${title}.png`;
        link.click();
    };

    return (
        <div className="px-6 space-y-6 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-5">
                <h1 className="text-xl md:text-2xl font-bold">Tus códigos QR</h1>
                <Button
                    onClick={() => {
                        if (qrs.length >= 5) {
                            toast.warning("Máximo 5 códigos QR permitidos.");
                            return;
                        }
                        router.push("/dashboard/qr-generator");
                    }}
                    disabled={qrs.length >= 5}
                    className="cursor-pointer rounded-sm p-3"
                >
                    <FaPlus />
                    Crear un nuevo código QR
                </Button>
            </div>

            <div className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-around md:justify-between gap-4 w-full bg-white p-5 rounded-sm shadow-sm">
                    <Input
                        placeholder="Buscar por nombre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-full"
                    />
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="estado"
                            checked={showActive}
                            onCheckedChange={setShowActive}
                        />
                        <Label htmlFor="estado">{showActive ? "Activos" : "Inactivos"}</Label>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center flex-col">
                {filtered.map((qr) => {
                    return (
                        <div
                            key={qr.id}
                            className="rounded-xl border border-[#d1d5db] shadow p-5 space-y-3 bg-white my-4 w-full flex flex-col md:flex-row justify-start items-center"
                        >
                            <QRCodeCanvas
                                id={`qr-${qr.id}`}
                                value={qr.value}
                                bgColor={qr.design.backgroundColor}
                                fgColor={qr.design.foregroundColor}
                                level={qr.design.level}
                                imageSettings={qr.design.image ? qr.design.imageSettings : undefined}
                                size={qr.design.qrSize}
                                className="border border-gray-300 rounded-md p-4 max-w-[95px] max-h-[95px]"
                            />
                            <div className="w-full md:w-[25rem] mb-0 truncate ml-5 md:border-r-2 md:border-r-[#d1d5db]">
                                <p className="uppercase md:text-xs font-bold text-[#0069ff]">
                                    {qr.type}
                                </p>
                                <p className="block truncate font-bold text-black mt-4">
                                    {qr.title}
                                </p>
                                <p className="text-[10px] font-medium flex items-center gap-2 mt-2">
                                    Creado:{" "}
                                    {qr.createdAt.toDate().toLocaleDateString("es-ES")}
                                </p>
                                <p className="text-[10px] font-medium flex items-center gap-2">
                                    Modificado:{" "}
                                    {qr.updatedAt.toDate().toLocaleDateString("es-ES")}
                                </p>
                            </div>
                            <div className="flex justify-start ml-10 w-full md:w-2xs md:border-r-2 md:border-r-[#d1d5db] h-[70px] mb-0">
                                <article className="flex items-center overflow-hidden">
                                    <TfiWorld fontSize={12} />
                                    <Link
                                        href={qr.value}
                                        className="text-sm underline text-black ml-1 truncate max-w-[160px] md:max-w-[240px] lg:max-w-[320px] overflow-hidden whitespace-nowrap"
                                        target="_blank"
                                    >
                                    {qr.value}
                                    </Link>
                                </article>
                            </div>
                            <div className="flex justify-start items-center flex-col w-full md:w-2xs md:border-r-2 md:border-r-[#d1d5db] h-[70px] mb-0">
                                <p className="text-xs font-bold text-[#64748b]">Escaneos</p>
                                <p className="text-center content-center w-[40px] h-[40px] bg-[#0069ff1a] rounded-full font-bold text-2xl mt-2">
                                    {qr.scanCount}
                                </p>
                            </div>
                            <div className="flex justify-around items-center w-full md:w-96 h-[70px]">
                                <Button
                                    variant="outline"
                                    onClick={() => handleDownload(qr)}
                                    className="text-sm font-normal text-black border-black border-2 hover:bg-black hover:text-white rounded-sm px-4 h-[40px] cursor-pointer"
                                >
                                    <BsDownload size={20} />
                                    Descargar
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="bg-black !rounded-[8px] text-white cursor-pointer">
                                        <Button variant="ghost" className="hover:bg-gray-200 rounded-full p-2">
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-40">
                                        <DropdownMenuItem onClick={() => router.push(`/dashboard/edit/${qr.id}`)}>
                                            <FaRegEdit fontSize={20} />
                                            Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleToggleActive(qr)}>
                                            <MdOutlineDesktopAccessDisabled fontSize={20} />
                                            {qr.isActive ? "Desactivar" : "Activar"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDelete(qr)} className="text-red-600">
                                            <MdOutlineDeleteOutline fontSize={20} color="#e7000b" />
                                            Eliminar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    )
                })}
            </div>

            {!loading && filtered.length === 0 && (
                <p className="text-center text-muted-foreground text-sm">
                    No hay códigos QR aún.
                </p>
            )}
        </div>
    );
}
