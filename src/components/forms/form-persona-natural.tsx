"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { personaNaturalSchema } from "@/utils/zod/schemas"

export function FormClientePersonaNatural({onSubmitData}: {onSubmitData : (data: any) => void}) {
  const form = useForm<z.infer<typeof personaNaturalSchema>>({
    resolver: zodResolver(personaNaturalSchema),
  })

  async function onSubmit(values: z.infer<typeof personaNaturalSchema>) {
    console.log(values)
    await onSubmitData(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres:</FormLabel>
              <FormControl>
                <Input placeholder="Juan" {...field} />
              </FormControl>
              <FormMessage className="text-end"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos:</FormLabel>
              <FormControl>
                <Input placeholder="Perez Perez" {...field} />
              </FormControl>
              <FormMessage className="text-end"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DNI o pasaporte:</FormLabel>
              <FormControl>
                <Input placeholder="10203040" {...field} />
              </FormControl>
              <FormMessage className="text-end"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico:</FormLabel>
              <FormControl>
                <Input placeholder="juanperez@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="text-end"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de celular:</FormLabel>
              <FormControl>
                <Input placeholder="1987654321" {...field} />
              </FormControl>
              <FormMessage className="text-end"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección:</FormLabel>
              <FormControl>
                <Input placeholder="Calle los pinos mz D ..." {...field} />
              </FormControl>
              <FormMessage className="text-end"/>
            </FormItem>
          )}
        />
        <div className="flex justify-center py-3">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  )
}
