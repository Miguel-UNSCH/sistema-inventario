"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { personaJuridicaSchema } from "@/utils/zod/schemas";

export function FormClientePersonaJuridica() {
  const form = useForm<z.infer<typeof personaJuridicaSchema>>({
    resolver: zodResolver(personaJuridicaSchema),
  });

  function onSubmit(values: z.infer<typeof personaJuridicaSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón social:</FormLabel>
              <FormControl>
                <Input placeholder="Corporacion ..." {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ruc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RUC:</FormLabel>
              <FormControl>
                <Input
                  placeholder="20102020 ..."
                  {...field}
                  onInput={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                    const input = inputElement.value.replace(/\D/g, "");
                    inputElement.value = input.slice(0, 11);
                    field.onChange(inputElement.value);
                  }}
                  maxLength={11}
                />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="representativeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del representante:</FormLabel>
              <FormControl>
                <Input placeholder="Juan perez ..." {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="representativePosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puesto del representante:</FormLabel>
              <FormControl>
                <Input placeholder="Gerente general" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo de la empresa:</FormLabel>
              <FormControl>
                <Input placeholder="gatitas@gatitas.com" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de teléfono:</FormLabel>
              <FormControl>
                <Input
                  placeholder="987654321 ..."
                  {...field}
                  onInput={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                    const input = inputElement.value.replace(/\D/g, "");
                    inputElement.value = input.slice(0, 9);
                    field.onChange(inputElement.value);
                  }}
                  maxLength={9}
                />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección de la empresa:</FormLabel>
              <FormControl>
                <Input placeholder="Jr. los pinos ..." {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de empresa:</FormLabel>
              <FormControl>
                <Input placeholder="pequeña/mediana/grande" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <div className="flex justify-center py-3">
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
}
