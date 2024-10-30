"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { personaJuridicaSchema } from "@/utils/zod/schemas";
import toasterCustom from "../toaster-custom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createClientJuridico, updateClientJuridico } from "@/actions/client-actions";

interface ChildComponentProps {
  setOpen: (open: boolean) => void;
  data: z.infer<typeof personaJuridicaSchema>;
  idEdit?: string;
}

export function FormClientePersonaJuridica({ setOpen, data, idEdit } : ChildComponentProps) {
  
  const router = useRouter();
  
  const form = useForm<z.infer<typeof personaJuridicaSchema>>({
    resolver: zodResolver(personaJuridicaSchema),
    defaultValues: data
      ? {
        companyName: data.companyName,
        ruc: data.ruc,
        representativeName: data.representativeName,
        representativePosition: data.representativePosition,
        email: data.email,
        phone: data.phone,
        address: data.address,
        companyType: data.companyType
      }
      : {},
  });

  async function onSubmitUpdate(id: string, values: z.infer<typeof personaJuridicaSchema>) {
    toasterCustom(0);
    const data = await updateClientJuridico(id, values);

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

  async function onSubmitCreate(values: z.infer<typeof personaJuridicaSchema>) {
    toasterCustom(0);
    const data = await createClientJuridico(values);

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
      form.setError("ruc", { type: "error", message: data.message });
      form.setFocus("ruc");

    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);

      setOpen(false);
    }
  }

  async function onSubmit(values: z.infer<typeof personaJuridicaSchema>) {
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
          name="email"
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
          name="phone"
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
          name="address"
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
