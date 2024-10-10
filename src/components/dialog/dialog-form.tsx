import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DialogContentProps {
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
  className?: string
  textButton: string
  titleDialog: string
  descriptionDialog?: string
  children: React.ReactNode
}

export function DialogForm({ variant, className, textButton, titleDialog, descriptionDialog, children }: DialogContentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant}>{textButton}</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${className}`}>
        <DialogHeader>
          <DialogTitle>{titleDialog}</DialogTitle>
          <DialogDescription>
            {descriptionDialog}
          </DialogDescription>
        </DialogHeader>
        { children }
      </DialogContent>
    </Dialog>
  )
}
