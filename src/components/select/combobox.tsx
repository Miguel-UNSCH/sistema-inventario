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
    options: Array<{ value: string; label: string }>
    onChange?: (value: string | null) => void
    placeholder: string
    value?: string
}

export const Combobox = React.forwardRef<HTMLButtonElement, GenericSelectProps>(
    ({ options, placeholder, onChange, value }, ref) => {
        const [open, setOpen] = React.useState(false)
        const [inputValue, setInputValue] = React.useState("")

        // Filtra las opciones según el valor ingresado
        const filteredOptions = options.filter(option =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
        )

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        onClick={() => setOpen(!open)}
                    >
                        {value
                            ? options.find(option => option.value === value)?.label
                            : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                    <Command>
                        <CommandInput
                            className="my-2 border-0 ring-1 ring-border border-border focus:ring-primary"
                            placeholder={`Search ${placeholder}...`}
                            value={inputValue}
                            onValueChange={setInputValue}
                        />
                        <CommandList>
                            <CommandEmpty>No hay coincidencias.</CommandEmpty>
                            <CommandGroup>
                                {filteredOptions.map(option => (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            const selectedValue = option.value
                                            onChange?.(selectedValue === value ? null : selectedValue)
                                            setOpen(false)
                                            setInputValue("") // Reinicia inputValue al seleccionar
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
)

Combobox.displayName = "Combobox"
