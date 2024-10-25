/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { entradasSchema } from "@/utils/zod/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import toasterCustom from "../toaster-custom";
import { Combobox } from "../select/combobox";
import InputIcon from "../input/input-icon";
import { createEntrada, updateEntrada } from "@/actions/entrada-actions";
import { useEffect } from "react";

interface ChildComponentProps {
  data: z.infer<typeof entradasSchema>;
  idEdit?: string;
  unidadesOptions: Array<{ value: string; label: string }>;
  productsOptions: Array<{ value: string; label: string }>;
  supplierOptions: Array<{ value: string; label: string }>;
  setItemEditing: (value: null) => void
}

export function FormEntrada({ data, idEdit, unidadesOptions, productsOptions, supplierOptions, setItemEditing }: ChildComponentProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof entradasSchema>>({
    resolver: zodResolver(entradasSchema),
    defaultValues: data || {} 
  });

   // Agrega este useEffect
  useEffect(() => {
    if (data) {
      form.reset(data); // Aquí actualizas los valores del formulario
    }
  }, [data, form]);

  async function onSubmitUpdate(id: string, values: z.infer<typeof entradasSchema>) {
    console.log(values);
    toasterCustom(0);
    const data = await updateEntrada(id, values);

    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      router.refresh(); // actualizar la tabla
      setItemEditing(null);
      form.reset()

    } else if (data.status === 400) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    }
  }

  async function onSubmitCreate(values: z.infer<typeof entradasSchema>) {
    toasterCustom(0);

    const data = await createEntrada(values);

    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      router.refresh(); // actualizar la tabla
      form.reset();

    } else if (data.status === 400) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    }
  }

  async function onSubmit(values: z.infer<typeof entradasSchema>) {
    console.log(values);

    if (idEdit) {
      await onSubmitUpdate(idEdit, values);
    } else {
      await onSubmitCreate(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producto:</FormLabel>
                <FormControl>
                  <Combobox placeholder="seleccione" options={productsOptions} {...field} />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proveedorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proveedor:</FormLabel>
                <FormControl>
                  <Combobox placeholder="seleccione" options={supplierOptions} {...field} />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unidadId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidad de medida:</FormLabel>
                <FormControl>
                  <Combobox placeholder="seleccione" options={unidadesOptions} {...field} />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="precioCompra"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio de compra:</FormLabel>
                <FormControl>
                  <InputIcon icon={"S/."} placeholder="10" {...field} value={field.value || ''} type="number" />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="precioVenta"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio de venta:</FormLabel>
                <FormControl>
                  <InputIcon icon={"S/."} placeholder="12" {...field} value={field.value || ''} type="number" />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cantidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad:</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} value={field.value || ''} type="number" />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center py-3">
          <Button type="submit">{idEdit ? "Actualizar" : "Guardar"}</Button>
        </div>
      </form>
    </Form>
  );
}
