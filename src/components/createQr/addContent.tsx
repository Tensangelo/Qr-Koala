"use client";

import { useEffect, useState } from "react";
// Components
import { Card } from "@components/ui/card";
import { AccordionCustom } from "@components/tools/accordionCustom";
// Icons
import { TfiWorld } from "react-icons/tfi";
import { PiQrCodeBold } from "react-icons/pi";

interface AddContentProps {
    url: string;
    title: string;
    onChange: (field: "title" | "value", value: string) => void;
    error: string;
}

export const AddContent = ({ url, title, onChange, error }: AddContentProps) => {
    const [localUrl, setLocalUrl] = useState(url);
    const [localTitle, setLocalTitle] = useState(title);

    useEffect(() => {
        onChange("value", localUrl);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localUrl]);

    useEffect(() => {
        onChange("title", localTitle);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localTitle]);

    return (
        <>
            <Card className="w-full py-0 mb-4 shadow rounded-md border-1 border-[#d1d5db]">
                <AccordionCustom
                    idAccordion="qr-name"
                    icon={<TfiWorld size={30} />}
                    title="Información del sitio web"
                    description="Introduzca la URL a la que redirigirá este QR."
                    nameLabel="URL"
                    placeholder="https://website.com"
                    type="url"
                    required={true}
                    error={error}
                    localName={localUrl}
                    setLocalName={setLocalUrl}
                />
            </Card>
            <Card className="w-full py-0 mb-4 shadow rounded-md border-1 border-[#d1d5db]">
                <AccordionCustom
                    idAccordion="qr-data"
                    icon={<PiQrCodeBold size={30} />}
                    title="Nombre del código QR"
                    description="Dale un nombre a tu código QR."
                    nameLabel="Nombre QR"
                    placeholder="Por ejemplo, mi primer código QR"
                    type="text"
                    required={false}
                    localName={localTitle}
                    setLocalName={setLocalTitle}
                />
            </Card>
        </>
    );
};
