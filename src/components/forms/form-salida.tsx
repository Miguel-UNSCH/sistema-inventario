/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { salidasSchema } from "@/utils/zod/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import toasterCustom from "../toaster-custom";
import { Combobox } from "../select/combobox";
import InputIcon from "../input/input-icon";
import { useEffect } from "react";
import { createSalida, getPrecioVenta, updateSalida } from "@/actions/salida-actions";

interface ChildComponentProps {
  data: z.infer<typeof salidasSchema>;
  idEdit?: string;
  productsOptions: Array<{ value: string; label: string }>;
  clientOptions: Array<{ value: string; label: string }>;
  setItemEditing: (value: null) => void;
  handleClientId: (item: string | null) => void;
  onCreateSalida: () => void
}

export function FormSalida({ 
  data, 
  idEdit, 
  productsOptions, 
  clientOptions, 
  setItemEditing, 
  handleClientId,
  onCreateSalida
 }: ChildComponentProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof salidasSchema>>({
    resolver: zodResolver(salidasSchema),
    defaultValues: data || {},
  });

  // Agrega este useEffect
  useEffect(() => {
    if (data) {
      form.reset(data); // Aquí actualizas los valores del formulario
    }
  }, [data, form]);

  async function onSubmitUpdate(id: string, values: z.infer<typeof salidasSchema>) {
    console.log(values);
    toasterCustom(0);
    const data = await updateSalida(id, values);
  
    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }
  
    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      router.refresh(); // actualizar la tabla
      onCreateSalida()
      setItemEditing(null);
      
      // Preservar clientId al resetear
      const currentClientId = form.getValues('clientId');
      router.refresh();
      form.reset({ clientId: currentClientId });
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    }
  }
  
  async function onSubmitCreate(values: z.infer<typeof salidasSchema>) {
    toasterCustom(0);
  
    const data = await createSalida(values);
  
    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }
  
    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      onCreateSalida()
      router.refresh(); // actualizar la tabla
      
      // Preservar clientId al resetear
      const currentClientId = form.getValues('clientId');
      form.reset({ clientId: currentClientId });
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);
    }
  }
  

  async function obtenerPrecioVenta(idProducto: string) {
    const precioVenta = await getPrecioVenta(idProducto)
    if (precioVenta.precioVenta) {
      form.setValue("precioVenta", precioVenta.precioVenta);
    } else {
      form.setError("precioVenta", {"message": "No tiene precio asignado"});
    }
  }

  async function onSubmit(values: z.infer<typeof salidasSchema>) {
    console.log(values);

    if (idEdit) {
      await onSubmitUpdate(idEdit, values);
    } else {
      await onSubmitCreate(values);
    }
  }

  const handleExternalAction = () => {
    const currentClientId = form.getValues("clientId");
    handleClientId(currentClientId ? currentClientId : null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row justify-between items-center">
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem
              className="max-sm:w-full"
            >
              <FormLabel>Cliente:</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="seleccione"
                  options={clientOptions}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <Button 
          type="button"
          onClick={handleExternalAction}
          disabled={form.getValues('clientId') ? false : true} 
          className="disabled:cursor-none max-sm:w-full">
          Cargar datos del cliente
        </Button>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          <FormField
            control={form.control}
            name="entradaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producto:</FormLabel>
                <FormControl>
                  <Combobox 
                    placeholder="seleccione" 
                    options={productsOptions} 
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                      if (value) {
                        obtenerPrecioVenta(value);
                      }
                    }}
                  />
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
                  <InputIcon icon={"S/."} placeholder="12" {...field} value={field.value || ""} type="number" />
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
                  <Input placeholder="10" {...field} value={field.value || ""} type="number" />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tipoDescuento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de descuento:</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="seleccione"
                    options={[
                      { label: "Porcentual", value: "porcentual" },
                      { label: "Fijo", value: "fijo" },
                    ]}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descuento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descuento:</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} value={field.value || ""} type="number" />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center py-3">
          <Button type="submit">{idEdit ? "Actualizar" : "Agregar"}</Button>
        </div>
      </form>
    </Form>
  );
}
