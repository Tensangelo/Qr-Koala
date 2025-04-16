"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@components/ui/input";
import { Switch } from "@components/ui/switch";
import { Label } from "@components/ui/label";
import { ColorPopover } from "@components/tools/colorPicker";
import { AccordionCustom } from "@components/tools/accordionCustom";
import { Card } from "@components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
// Libs
import { QRDesign } from "@libs/qrCodes";
// Icons
import { GiResize } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";
import { VscSymbolColor } from "react-icons/vsc";
import { LuImagePlus } from "react-icons/lu";

interface CustomizeProps {
    design: QRDesign;
    onChange: (design: QRDesign) => void;
    isLoading?: boolean;
}

export const Customize = ({ design, onChange, isLoading = false }: CustomizeProps) => {
    const [qrSize, setQrSize] = useState(design.qrSize);

    useEffect(() => {
        onChange({
            ...design,
            qrSize: qrSize,
        });
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qrSize])

    const handleToggleImage = (value: boolean) => {
        onChange({
            ...design,
            image: value,
            imageSettings: value
                ? {
                    src: design.imageSettings?.src || "",
                    height: 24,
                    width: 24,
                    opacity: 1,
                    excavate: true,
                } : undefined,
        });
    };

    const handleImageLink = (e: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...design,
            imageSettings: {
                ...design.imageSettings!,
                src: e.target.value,
            },
        });
    };

    const handleImageSize = (field: "height" | "width", value: number) => {
        if (value > design.qrSize) return; // No permite que la imagen exceda el tamaño del QR
        onChange({
            ...design,
            imageSettings: {
                ...design.imageSettings!,
                [field]: value,
            },
        });
    };

    // const handleQRSize = (value: number) => {
    //     if (value > 250) return; // Máximo tamaño del QR: 250 píxeles
    //     onChange({
    //         ...design,
    //         qrSize: value,
    //     });
    // };

    const handleChangeColor = (field: "foregroundColor" | "backgroundColor", value: string) => {
        onChange({
            ...design,
            [field]: value,
        });
    };

    // const handleChangeErrorCorrection = (value: "L" | "M" | "Q" | "H") => {
    //     onChange({
    //         ...design,
    //         level: value,
    //     });
    // };

    return (
        <div className="space-y-6">
            {/* Logo */}
            <Card className="w-full py-0 mb-4 shadow rounded-md border-1 border-[#d1d5db]">
                <Accordion
                    type="single"
                    collapsible
                    defaultValue='qr-isImage'
                    className="w-full mx-auto px-4 py-6"
                >
                    <AccordionItem value='qr-isImage'>
                        <AccordionTrigger className="justify-between w-full py-0 [&>svg]:h-[30px] [&>svg]:w-[30px] [&>svg]:text-[#4d4842] hover:no-underline cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="bg-white border border-[#4d4842] rounded-md text-gray-custom w-14 h-14 md:w-8 md:h-8 grid place-content-center p-4 sm:p-8">
                                    <LuImagePlus size={30} />
                                </div>
                                <article className="text-start">
                                    <p className="font-medium text-lg md:text-base text-[#11181c]">
                                        Habilitar imagen
                                    </p>
                                    <p className="text-sm md:text-xs text-[#6b7280]">
                                        Selecciona una imagen para el QR.
                                    </p>
                                </article>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-6 pb-0">
                            <hr className="border-gray-300" />
                            <div className="space-y-2 border border-gray-300 p-3 pb-4 mt-6 rounded-md">
                                <Label className="flex items-center gap-2 mt-4">
                                    <Switch
                                        checked={design.image}
                                        onCheckedChange={handleToggleImage}
                                        disabled={isLoading}
                                    />
                                    Habilitar imagen
                                </Label>
                                {design.image && (
                                    <div className="space-y-2 bg-gray-100 px-3 py-6 mt-4">
                                        <Label
                                            htmlFor="image-url"
                                            className="font-medium text-lg md:text-base text-[#11181c]"
                                        >
                                            URL de la imagen
                                        </Label>
                                        <Input
                                            id="image-url"
                                            type="text"
                                            placeholder="https://example.com/image.png"
                                            value={design.imageSettings?.src ?? ""}
                                            onChange={handleImageLink}
                                            className={`appearance-none rounded-lg w-full h-[46px] py-3 px-3 text-base bg-white text-gray-900 leading-5 focus:outline-none focus:shadow-outline border`}
                                            disabled={isLoading}
                                        />
                                        <div className="flex gap-4 mt-6">
                                            <div>
                                                <Label
                                                    htmlFor="image-height"
                                                    className="font-medium text-lg md:text-base text-[#11181c]"
                                                >
                                                    Altura de la imagen
                                                </Label>
                                                <Input
                                                    id="image-height"
                                                    type="number"
                                                    min={1}
                                                    max={design.qrSize} // No permite que la imagen exceda el tamaño del QR
                                                    value={design.imageSettings?.height ?? 24}
                                                    onChange={(e) =>
                                                        handleImageSize("height", parseInt(e.target.value, 10))
                                                    }
                                                    className={`appearance-none rounded-lg w-full h-[46px] py-3 px-3 text-base bg-white text-gray-900 leading-5 focus:outline-none focus:shadow-outline border mt-2`}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div>
                                                <Label
                                                    htmlFor="image-width"
                                                    className="font-medium text-lg md:text-base text-[#11181c]"
                                                >
                                                    Ancho de la imagen
                                                </Label>
                                                <Input
                                                    id="image-width"
                                                    type="number"
                                                    min={1}
                                                    max={design.qrSize} // No permite que la imagen exceda el tamaño del QR
                                                    value={design.imageSettings?.width ?? 24}
                                                    onChange={(e) =>
                                                        handleImageSize("width", parseInt(e.target.value, 10))
                                                    }
                                                    className={`appearance-none rounded-lg w-full h-[46px] py-3 px-3 text-base bg-white text-gray-900 leading-5 focus:outline-none focus:shadow-outline border mt-2`}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card>

            {/* Tamaño del QR */}
            <Card className="w-full py-0 mb-4 shadow rounded-md border-1 border-[#d1d5db]">
                <AccordionCustom
                    idAccordion="qr-size"
                    icon={<GiResize size={30} />}
                    title="Tamaño del QR (máx. 250px)"
                    description="Seleccion el tamaño del QR que deseas generar."
                    nameLabel="Tamaño del QR"
                    placeholder="250"
                    type="number"
                    required={false}
                    localName={qrSize}
                    setLocalName={(value: string) => setQrSize(parseInt(value, 10))}
                />
            </Card>

            {/* Colors */}

            <Card className="w-full py-0 mb-4 shadow rounded-md border-1 border-[#d1d5db]">
                <AccordionCustom
                    idAccordion="qr-color-foreground"
                    icon={<IoIosColorPalette size={30} />}
                    title="Color del frente"
                    description="Seleccion el color del frente del QR."
                    nameLabel="Color del frente"
                    type="text"
                    required={false}
                    iscolor={true}
                >
                    <div className="space-y-2">
                        <p className="block text-gray-500 mb-2 text-left text-sm break-words font-bold">
                            Color del frente
                        </p>
                        <ColorPopover
                            color={design.foregroundColor}
                            setColor={(value) => handleChangeColor("foregroundColor", value)}
                        />
                    </div>
                </AccordionCustom>
            </Card>

            <Card className="w-full py-0 mb-4 shadow rounded-md border-1 border-[#d1d5db]">
                <AccordionCustom
                    idAccordion="qr-color-background"
                    icon={<VscSymbolColor size={30} />}
                    title="Color del fondo"
                    description="Seleccion el color del fondo del QR."
                    nameLabel="Color del fondo"
                    type="text"
                    required={false}
                    iscolor={true}
                >
                    <div className="space-y-2">
                        <p className="block text-gray-500 mb-2 text-left text-sm break-words font-bold">
                            Color del fondo
                        </p>
                        <ColorPopover
                            color={design.backgroundColor}
                            setColor={(value) => handleChangeColor("backgroundColor", value)}
                        />
                    </div>
                </AccordionCustom>
            </Card>

            <div className="mb-14" />
            {/* Corrección de error */}
            {/* <div className="space-y-2">
                <Label htmlFor="error-level">Nivel de corrección de error</Label>
                <select
                    id="error-level"
                    value={design.level}
                    onChange={(e) =>
                        handleChangeErrorCorrection(e.target.value as "L" | "M" | "Q" | "H")
                    }
                    className="border rounded px-3 py-2"
                >
                    <option value="L">Bajo (L)</option>
                    <option value="M">Medio (M)</option>
                    <option value="Q">Cuartil (Q)</option>
                    <option value="H">Alto (H)</option>
                </select>
            </div> */}
        </div>
    );
};
