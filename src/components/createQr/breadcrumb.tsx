"use client";

import { ReactNode, useState } from "react";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@libs/utils";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

interface BreadcrumbProps {
    steps: string[];
    currentStep: number;
    onNext: () => void;
    onBack: () => void;
    children: ReactNode;
    preview?: ReactNode;
    isLoading?: boolean;
}

export const Breadcrumb = ({
    steps,
    currentStep,
    onNext,
    onBack,
    children,
    preview,
    isLoading = false, // Valor predeterminado
}: BreadcrumbProps) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [showMobilePreview, setShowMobilePreview] = useState(false);

    return (
        <div className="flex flex-col w-full h-full space-y-4">
            {/* Header de pasos */}
            <div className="h-[64px] bg-white shadow border-b-2 border-b-[#d1d5db] flex items-center justify-center px-4">
                {isMobile ? (
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm">
                            {currentStep}
                        </span>
                        <span className="font-medium text-sm text-center">{steps[currentStep - 1]}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        {steps.map((s, i) => (
                            <div key={s} className="flex items-center gap-2">
                                <div
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm",
                                        i + 1 <= currentStep ? "font-bold text-black" : "text-gray-500"
                                    )}
                                >
                                    <span
                                        className={cn(
                                        "flex items-center justify-center w-6 h-6 rounded-full text-white",
                                        i + 1 <= currentStep ? "bg-black" : "bg-gray-300"
                                        )}
                                    >
                                        {i + 1}
                                    </span>
                                    {s}
                                </div>
                                {i < steps.length - 1 && (
                                    <span
                                        className={cn(
                                        "text-lg transition-colors duration-300",
                                        i + 1 === currentStep ? "text-black" : "text-gray-300"
                                        )}
                                    >
                                        &#9654;
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="flex flex-col md:flex-row flex-1 gap-4 mt-5 w-full max-w-[1200px] mx-auto px-4 md:px-6">
                <div className="flex-1">
                    <article className="flex items-center gap-2 text-black font-bold text-xl md:text-2xl mb-4">
                        <span className="flex items-center justify-center w-6 h-6">{currentStep}.</span>
                        <span className="text-center">{steps[currentStep - 1]}</span>
                    </article>
                    {children}
                </div>

                {/* Vista previa desktop */}
                {!isMobile && preview && currentStep > 1 && (
                    <div className="w-80">
                        <Card className="p-4 sticky top-16">
                            {preview}
                        </Card>
                    </div>
                )}
            </div>

            {/* Navegación */}
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 z-50">
                <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={onBack}
                        disabled={currentStep === 1 || isLoading} // Deshabilitado si está cargando
                    >
                        {isLoading ? "Cargando..." : currentStep === 1 ? "Cancelar" : isMobile ? <FaChevronLeft /> : "Anterior"}
                    </Button>

                    <div className="flex items-center gap-2">
                        {isMobile && (currentStep === 2 || currentStep === 3) && (
                            <Button
                                variant="secondary"
                                onClick={() => setShowMobilePreview(true)}
                                disabled={isLoading} // Deshabilitado si está cargando
                            >
                                <MdOutlinePhoneAndroid /> Vista previa
                            </Button>
                        )}
                    </div>

                    <Button
                        className="cursor-pointer"
                        onClick={onNext}
                        disabled={isLoading} // Deshabilitado si está cargando
                    >
                        {isLoading ? "Cargando..." : currentStep === steps.length ? "Finalizar" : isMobile ? <FaChevronRight /> : "Siguiente"}
                    </Button>
                </div>
            </div>

            {/* Modal mobile */}
            {showMobilePreview && (
                <div className="fixed inset-0 z-50 bg-[#a3a3a344] bg-opacity-50 flex items-center justify-center">
                    <Card className="p-4">
                        {preview}
                        <Button className="mt-4 w-full" onClick={() => setShowMobilePreview(false)}>
                            Cerrar
                        </Button>
                    </Card>
                </div>
            )}
        </div>
    );
};
