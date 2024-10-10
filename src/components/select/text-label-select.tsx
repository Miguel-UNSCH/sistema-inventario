import { GenericSelectProps, SelectFilter } from "./select-filter";

interface TextLabelInputProps extends GenericSelectProps {
  label: string;
  isRequired: boolean;
}

function TextLabelSelect({ label, isRequired, ...props } : TextLabelInputProps) {
  return (
    <div className="w-full flex flex-col justify-start gap-2">
      <label className="text-sm flex gap-2">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <SelectFilter {...props}/>
    </div>
  )
}

export default TextLabelSelect;
