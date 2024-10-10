import { Input } from "../ui/input";

interface TextLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isRequired?: boolean;
}

function TextLabelInput({id, label, isRequired, ...props} : TextLabelInputProps) {
  return (
    <div className="w-full flex flex-col justify-start gap-2">
      <label htmlFor={id} className="text-sm flex gap-2">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <Input id={id} {...props}/>
    </div>
  )
}

export default TextLabelInput;
