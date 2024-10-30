"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { personaNaturalSchema } from "@/utils/zod/schemas";
import { useRouter } from "next/navigation";
import toasterCustom from "../toaster-custom";
import { toast } from "sonner";
import { createClientNatural, updateClientNatural } from "@/actions/client-actions";

interface ChildComponentProps {
  setOpen: (open: boolean) => void;
  data: z.infer<typeof personaNaturalSchema>;
  idEdit?: string;
}

export function FormClientePersonaNatural({ setOpen, data, idEdit } : ChildComponentProps) {
  
  const router = useRouter();
  
  const form = useForm<z.infer<typeof personaNaturalSchema>>({
    resolver: zodResolver(personaNaturalSchema),
    defaultValues: data
      ? {
        firstName: data.firstName,
        lastName: data.lastName,
        identifier: data.identifier,
        email: data.email,
        phone: data.phone,
        address: data.address
      }
      : {},
  });

  async function onSubmitUpdate(id: string, values: z.infer<typeof personaNaturalSchema>) {
    toasterCustom(0);
    const data = await updateClientNatural(id, values);

    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      router.refresh();

      setOpen(false);
    } else if (data.status === 400) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);

      setOpen(false);
    }
  }

  async function onSubmitCreate(values: z.infer<typeof personaNaturalSchema>) {
    toasterCustom(0);
    const data = await createClientNatural(values);

    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      router.refresh(); // actualizar la tabla

      setOpen(false);
    } else if (data.status === 400) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      form.setError("identifier", { type: "error", message: data.message });
      form.setFocus("identifier");

    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);

      setOpen(false);
    }
  }

  async function onSubmit(values: z.infer<typeof personaNaturalSchema>) {
    if (idEdit) {
      await onSubmitUpdate(idEdit, values);
    } else {
      await onSubmitCreate(values);
    }
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
              <FormMessage className="text-end" />
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
              <FormMessage className="text-end" />
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
              <FormMessage className="text-end" />
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
              <FormMessage className="text-end" />
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección:</FormLabel>
              <FormControl>
                <Input placeholder="Calle los pinos mz D ..." {...field} />
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
