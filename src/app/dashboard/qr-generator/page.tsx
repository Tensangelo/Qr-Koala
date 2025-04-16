"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Components
import { Breadcrumb } from "@components/createQr/breadcrumb";
import { SelectType } from "@components/createQr/selectType";
import { AddContent } from "@components/createQr/addContent";
import { Customize } from "@components/createQr/customize";
import { QRPreview } from "@components/createQr/qrPreview";
// Components ui
import { toast } from "sonner";
// Libs
import { auth } from "@libs/firebase";
import { createQRCode, QRCode } from "@libs/qrCodes";
// Icons
import { Web } from "@assets/cards/web";

const steps = [
    "Seleccione el tipo de QR",
    "Añadir contenido",
    "Código QR de diseño"
];

const QrGenerator = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [visitedSteps, setVisitedSteps] = useState<number[]>([1]); // Controla los pasos visitados
    const [error, setError] = useState<string | null>(null); // Manejo de errores
    const [isLoading, setIsLoading] = useState(false); // Estado de carga

    const [qrData, setQrData] = useState<Pick<QRCode, "name" | "data" | "design" | 'url' | 'title'>>({
        name: "",
        url: "",
        title: "",
        data: "",
        design: {
            foregroundColor: "#000000",
            backgroundColor: "#ffffff",
            level: "L",
            image: false,
            imageSettings: {
                src: "",
                height: 24,
                width: 24,
                opacity: 1,
                excavate: true
            },
            qrSize: 250,
        }
    });

    const qrTypes = [
        {
            id: "web",
            label: "Sitio web",
            description: "Enlace a cualquier URL de sitio web",
            icon: <Web className="bg-black rounded-full w-14 h-14 p-2 lg:w-20 lg:h-20 lg:p-3 border-2" colorPrimary="#ffffff" />
        },
    ];

    const handleNext = async () => {
        setError(null); // Limpia errores previos
        if (step === 1) {
            // Validación para el paso 1
            if (!qrData.name) {
                setError("Debe seleccionar un tipo de QR.");
                return;
            }
        } else if (step === 2) {
            // Validación para el paso 2
            if (!qrData.url) {
                setError("Debe llenar todos los campos requeridos.");
                return;
            }
        }

        // Si está en el último paso, guardar y enviar
        if (step === steps.length) {
            setIsLoading(true); // Activa el estado de carga
            try {
                const user = auth.currentUser;
                if (!user) {
                    toast.error("Usuario no autenticado.");
                    setIsLoading(false);
                    return;
                }

                await createQRCode({
                    ...qrData,
                    uid: user.uid,
                    type: "website",
                    isActive: true,
                });

                toast.success("Código QR creado exitosamente.");
                router.push("/dashboard/qr");
            } catch (error) {
                console.error(error);
                toast.error("Error al guardar el código QR.");
            } finally {
                setIsLoading(false); // Desactiva el estado de carga
            }
            return;
        }

        // Avanza al siguiente paso y marca el paso como visitado
        setStep((prev) => {
            const nextStep = Math.min(prev + 1, steps.length);
            if (!visitedSteps.includes(nextStep)) {
                setVisitedSteps((prevVisited) => [...prevVisited, nextStep]);
            }
            return nextStep;
        });
    };

    const handleBack = () => {
        setError(null); // Limpia errores previos
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const getStepComponent = () => {
        switch (step) {
            case 1:
                return (
                    <SelectType
                        name={qrData.name}
                        onChange={(value) => setQrData((prev) => ({ ...prev, name: value }))}
                        types={qrTypes}
                    />
                );
            case 2:
                return (
                    <AddContent
                        url={qrData.url}
                        title={qrData.title}
                        onChange={(field, value) =>
                            setQrData((prev) => ({ ...prev, [field]: value }))
                        }
                        error={error || ""}
                    />
                );
            case 3:
                return (
                    <Customize
                        design={qrData.design}
                        onChange={(updatedDesign) =>
                            setQrData((prev) => ({
                                ...prev,
                                design: updatedDesign
                            }))
                        }
                        isLoading={isLoading}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <section className="w-full mt-14">
            <Breadcrumb
                steps={steps}
                currentStep={step}
                onNext={handleNext}
                onBack={handleBack}
                preview={<QRPreview qr={qrData} />}
                isLoading={isLoading}
            >
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {getStepComponent()}
            </Breadcrumb>
        </section>
    );
};

export default QrGenerator;
