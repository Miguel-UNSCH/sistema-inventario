"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SelectProps } from "@radix-ui/react-select"

export interface GenericSelectProps extends SelectProps {
    options: Array<{ value: string; label: string }>;
    onChange?: (value: string | null) => void;
    placeholder: string;
    value?: string;
}

// Cambia el componente a forwardRef
export const Combobox = React.forwardRef<HTMLButtonElement, GenericSelectProps>(
    ({ options, placeholder, onChange, value }, ref) => {
        const [open, setOpen] = React.useState(false)

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref} // Asigna la ref aquí
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        onClick={() => setOpen(!open)} // Alterna la apertura
                    >
                        {value
                            ? options.find((option) => option.value === value)?.label
                            : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                    <Command>
                        <CommandInput className="my-2 border-0 ring-1 ring-border border-border focus:ring-primary" placeholder={`Search ${placeholder}...`} />
                        <CommandList>
                            <CommandEmpty>No hay coincidencias.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            onChange?.(currentValue === value ? null : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    }
);

Combobox.displayName = "Combobox"; // Asignamos un nombre al componente para depuración
