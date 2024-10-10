'use client'
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectProps } from "@radix-ui/react-select";
 

export interface GenericSelectProps extends SelectProps {
  options: Array<{ value: string; label: string }>
  onChange?: (value: string | null) => void
  placeholder: string
}

export function SelectFilter({options, placeholder, ...props}: GenericSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger >
        <SelectValue placeholder={placeholder}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {
            options.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}