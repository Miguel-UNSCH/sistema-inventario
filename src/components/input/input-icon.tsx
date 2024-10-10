import React from "react";
import { Input } from "../ui/input";

interface InputIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
}

function InputIcon({ icon, ...props }: InputIconProps) {
  return (
    <div className="relative w-full max-w-96">
      <div className="absolute top-2.5 left-2">
        {icon}
      </div>
      <Input {...props} className="pl-8"/>
    </div>
  )
}

export default InputIcon;
