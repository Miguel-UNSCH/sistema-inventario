/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"

interface DialogContentProps {
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
  className?: string
  textButton: string
  titleDialog: string
  descriptionDialog?: string
  children: React.ReactNode
  open: boolean
  setOpen: (value: boolean) => void
  setItemEditing: (value: null) => void
}

export function DialogForm({ variant, className, textButton, titleDialog, descriptionDialog, children, open, setOpen, setItemEditing }: DialogContentProps) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={ () => {
          setOpen(true)
          setItemEditing(null)
        }} variant={variant}>{textButton}</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${className}`}>
        <DialogHeader>
          <DialogTitle className="text-center">{titleDialog}</DialogTitle>
          <DialogDescription className="text-center">
            {descriptionDialog}
          </DialogDescription>
        </DialogHeader>
        {
          children
        }
      </DialogContent>
    </Dialog>
  )
}

