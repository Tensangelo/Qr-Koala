import { HexColorPicker } from "react-colorful"
import { Popover, PopoverTrigger, PopoverContent } from "@components/ui/popover"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { useState } from "react"

export function ColorPopover({
    color,
    setColor,
}: {
    color: string
    setColor: (c: string) => void
}) {
    const [tempColor, setTempColor] = useState(color)

    const handleColorChange = (newColor: string) => {
        setTempColor(newColor)
        setColor(newColor)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTempColor(value)
        // Validamos que sea un HEX válido antes de aplicar
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            setColor(value)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" style={{ backgroundColor: color }}>
                    {color.toUpperCase()}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 space-y-2">
                <HexColorPicker color={tempColor} onChange={handleColorChange} />
                <div className="mt-5">
                    <Label
                        htmlFor="hex"
                        className="mb-2"
                    >Código HEX</Label>
                    <Input
                        id="hex"
                        value={tempColor}
                        onChange={handleInputChange}
                        placeholder="#000000"
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}
