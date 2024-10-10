"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SelectItem {
  key: string
  value: string
}

interface GenericSelectProps {
  items: SelectItem[]
  placeholder?: string
  onSelect: (item: SelectItem) => void
}

export default function GenericSelect({ items, placeholder = "Seleccionar item...", onSelect }: GenericSelectProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [filteredItems, setFilteredItems] = useState<SelectItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    console.log('items:', items);
    setFilteredItems((items || []).slice(0, 10))
  }, [items])

  const handleFilter = (input: string) => {
    if (!items || !Array.isArray(items)) return;
    const filtered = items
      .filter(item => 
        item.value.toLowerCase().includes(input.toLowerCase())
      )
      .slice(0, 10)
    setFilteredItems(filtered)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? items.find(item => item.key === value)?.value
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Buscar item..." 
            onValueChange={handleFilter}
            ref={inputRef}
          />
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup>
            { filteredItems?.length > 0 && filteredItems.map(item => (
              <CommandItem
                key={item.key}
                onSelect={() => {
                  setValue(item.key)
                  onSelect(item)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.key ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}