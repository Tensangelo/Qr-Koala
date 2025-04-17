// Components
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
// Components ui
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@components/ui/accordion";

interface AccordionProps {
    idAccordion?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    nameLabel?: string;
    placeholder?: string;
    type: 'text' | 'url' | 'email' | 'number' | 'tel';
    required?: boolean;
    error?: string;
    localName?: string | number;
    setLocalName?: (value: string) => void;
    iscolor?: boolean;
    children?: React.ReactNode;
}

export const AccordionCustom = ({
    idAccordion = "idAccordion",
    icon,
    title = "Información del sitio web",
    description = "Introduzca la URL a la que redirigirá este QR.",
    nameLabel = "URL",
    placeholder = "https://website.com",
    type = "text",
    required = false,
    error = "",
    localName = "",
    setLocalName = () => {},
    iscolor = false,
    children,
}: AccordionProps) => {
    return (
        <Accordion
            type="single"
            collapsible
            // defaultValue={idAccordion}
            className="w-full mx-auto px-4 py-6"
        >
            <AccordionItem value={idAccordion}>
                <AccordionTrigger className="justify-between w-full py-0 [&>svg]:h-[30px] [&>svg]:w-[30px] [&>svg]:text-[#4d4842] hover:no-underline cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="bg-white border border-[#4d4842] rounded-md text-gray-custom w-14 h-14 md:w-8 md:h-8 grid place-content-center p-4 sm:p-8">
                            {icon}
                        </div>
                        <article className="text-start">
                            <p className="font-medium text-lg md:text-base text-[#11181c]">
                                {title}
                                {required && (
                                    <span className="text-red-500 ml-2">*</span>
                                )}
                            </p>
                            <p className="text-sm md:text-xs text-[#6b7280]">
                                {description}
                            </p>
                        </article>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-6 pb-0">
                    <hr className="border-gray-300" />
                    <div className="space-y-2 bg-gray-100 border border-gray-300 p-3 pb-4 mt-6 rounded-md">
                        {iscolor ? (
                            children
                        ) : (
                            <>
                                <Label
                                    htmlFor={idAccordion}
                                    className="block text-gray-500 mb-2 text-left text-sm break-words font-bold"
                                >
                                    {nameLabel}
                                    {required && (
                                        <span className="text-red-500 ml-2">*</span>
                                    )}
                                </Label>
                                <Input
                                    id={idAccordion}
                                    placeholder={placeholder}
                                    type={type}
                                    value={localName}
                                    onChange={(e) => setLocalName(e.target.value)}
                                    required
                                    min={500}
                                    max={1000}
                                    className={`appearance-none rounded-lg w-full h-[46px] py-3 px-3 text-base bg-white text-gray-900 leading-5 focus:outline-none focus:shadow-outline border
                                        ${
                                            error ? "border-red-500" : "border-gray-300"
                                        }
                                    `}
                                />
                                {error && (
                                    <p className="text-red-500 text-xs mt-1 mb-2">Este campo es obligatorio</p>
                                )}
                            </>
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};