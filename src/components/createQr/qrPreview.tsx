"use client"

import { QRCodeSVG } from "qrcode.react";
import { QRCode } from "@libs/qrCodes";

interface QRPreviewProps {
    qr: Pick<QRCode, "value" | "design">;
}

export const QRPreview = ({ qr }: QRPreviewProps) => {
    const { value, design } = qr;

    return (
        <div className="flex flex-col items-center justify-center gap-2 max-w-[250px]">
            <QRCodeSVG
                key={`${value}-${design.level}-${design.foregroundColor}-${design.backgroundColor}-${design.qrSize}`}
                value={value}
                size={design.qrSize}
                bgColor={design.backgroundColor || "#ffffff"}
                fgColor={design.foregroundColor || "#000000"}
                level={design.level || "M"}
                imageSettings={
                    design.image
                        ? {
                            src: design.imageSettings?.src || "/images/qr_koala_logo.png",
                            x: undefined,
                            y: undefined,
                            height: design.imageSettings?.height || 24,
                            width: design.imageSettings?.width || 24,
                            opacity: design.imageSettings?.opacity || 1,
                            excavate: design.imageSettings?.excavate || true,
                        }
                        : undefined
                }
                className="w-full h-auto"
            />
        </div>
    );
};
