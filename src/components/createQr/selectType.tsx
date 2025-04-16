"use client";

import { JSX } from "react";
// Components
import { Card, CardContent } from "@components/ui/card";
// Icons
import { FaChevronRight } from "react-icons/fa";

type SelectTypeProps = {
    name: string; // Tipo de QR seleccionado actualmente
    onChange: (value: string) => void; // Función para manejar el cambio de tipo de QR
    types: { id: string; label: string; description: string; icon: JSX.Element }[]; // Lista de tipos de QR
};

export const SelectType = ({ name, onChange, types }: SelectTypeProps) => {
    return (
        <div className="flex flex-wrap gap-4">
            {types.map((type) => (
                <Card
                    key={type.id}
                    onClick={() => onChange(type.id)} // Selecciona el tipo de QR al hacer clic
                    className={`md:w-[180px] md:h-[192px] flex items-center justify-between shadow border-2 cursor-pointer transition-all group ${
                        name === type.id
                            ? "bg-black text-white border-black"
                            : "border-gray-300 hover:bg-black hover:text-white"
                    }`}
                >
                    <CardContent className="text-center flex flex-row md:flex-col items-center justify-start md:justify-center gap-2 px-4 py-0">
                        <div>{type.icon}</div>
                        <div>
                            <p className="text-left md:text-center font-bold xl:whitespace-nowrap truncate w-full group-hover:text-white">
                                {type.label}
                            </p>
                            <p className={`text-left md:text-center text-xs group-hover:text-white ${
                                name === type.id
                                    ? "text-white"
                                    : "text-[#4d4842]"
                                }`}>
                                {type.description}
                            </p>
                        </div>
                        <div className="md:hidden">
                            <FaChevronRight />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};