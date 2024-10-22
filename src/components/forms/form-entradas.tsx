"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import { entradasSchema } from "@/utils/zod/schemas";
// import { createRole, updateRole } from "@/lib/actions";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import toasterCustom from "../toaster-custom";
import { Combobox } from "../select/combobox";

interface ChildComponentProps {
  data: z.infer<typeof entradasSchema>;
  idEdit?: string;
}

export function FormEntrada({ data, idEdit }: ChildComponentProps) {
  // const router = useRouter();
  console.log(data);

  const form = useForm<z.infer<typeof entradasSchema>>({
    resolver: zodResolver(entradasSchema),
    // defaultValues: data ? { role: data.role, description: data.description } : {}
  });

  // async function onSubmitUpdate(id: string, values: z.infer<typeof entradasSchema>) {
  //   console.log(values);
  //   toasterCustom(0);
  //   const data = await updateRole(id, values);

  //   if (!data) {
  //     toasterCustom(500, "Ocurrió un error inesperado");
  //     return;
  //   }

  //   if (data.status === 200) {
  //     toast.dismiss();
  //     toasterCustom(data.status, data.message);
  //     router.refresh(); // actualizar la tabla

  //   } else if (data.status === 400) {
  //     toast.dismiss();
  //     toasterCustom(data.status, data.message);
  //     form.setError("role", { type: "error", message: data.message });
  //     form.setFocus("role");
  //   }
  // }

  // async function onSubmitCreate(values: z.infer<typeof entradasSchema>) {
  //   toasterCustom(0);
  //   const data = await createRole(values);

  //   if (!data) {
  //     toasterCustom(500, "Ocurrió un error inesperado");
  //     return;
  //   }

  //   if (data.status === 200) {
  //     toast.dismiss();
  //     toasterCustom(data.status, data.message);
  //     router.refresh(); // actualizar la tabla

  //   } else if (data.status === 400) {
  //     toast.dismiss();
  //     toasterCustom(data.status, data.message);
  //     form.setError("role", { type: "error", message: data.message });
  //     form.setFocus("role");
  //   }
  // }

  async function onSubmit(values: z.infer<typeof entradasSchema>) {
    console.log(values);

    // if (idEdit) {
    //   await onSubmitUpdate(idEdit, values);
    // } else {
    //   await onSubmitCreate(values);
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Producto:</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="seleccione"
                    options={[
                      { value: "id-product-1", label: "Laptop HP ProBook" },
                      { value: "id-product-2", label: "Teléfono Samsung Galaxy S21" },
                      { value: "id-product-3", label: "Monitor Dell UltraSharp" },
                      { value: "id-product-4", label: "Impresora Epson EcoTank" },
                      { value: "id-product-5", label: "Teclado Mecánico Corsair" },
                      { value: "id-product-6", label: "Mouse Inalámbrico Logitech MX" },
                      { value: "id-product-7", label: "Auriculares Sony WH-1000XM4" },
                      { value: "id-product-8", label: "Disco Duro Externo Seagate 2TB" },
                      { value: "id-product-9", label: "Tablet Apple iPad Pro" },
                      { value: "id-product-10", label: "Cámara Canon EOS Rebel" },
                      { value: "id-product-11", label: "Smartwatch Garmin Fenix 6" },
                      { value: "id-product-12", label: "Router TP-Link Archer" },
                      { value: "id-product-13", label: "Proyector Epson PowerLite" },
                      { value: "id-product-14", label: "SSD Samsung 970 EVO" },
                      { value: "id-product-15", label: "Smart TV LG OLED" },
                      { value: "id-product-16", label: "Parlante Bluetooth JBL Charge" },
                      { value: "id-product-17", label: "Microondas Panasonic Inverter" },
                      { value: "id-product-18", label: "Refrigeradora LG Door-in-Door" },
                      { value: "id-product-19", label: "Consola Sony PlayStation 5" },
                      { value: "id-product-20", label: "Cafetera Nespresso Vertuo" },
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
            name="unidadId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidad de medida:</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="seleccione"
                    options={[
                      { value: "id-und-medida-1", label: "Kilogramos (kg)" },
                      { value: "id-und-medida-2", label: "Gramos (g)" },
                      { value: "id-und-medida-3", label: "Litros (l)" },
                      { value: "id-und-medida-4", label: "Mililitros (ml)" },
                      { value: "id-und-medida-5", label: "Metros (m)" },
                      { value: "id-und-medida-6", label: "Centímetros (cm)" },
                      { value: "id-und-medida-7", label: "Milímetros (mm)" },
                      { value: "id-und-medida-8", label: "Unidad (unidad)" },
                      { value: "id-und-medida-9", label: "Paquete (paquete)" },
                      { value: "id-und-medida-10", label: "Toneladas (ton)" },
                      { value: "id-und-medida-11", label: "Onzas (oz)" },
                      { value: "id-und-medida-12", label: "Libras (lb)" },
                      { value: "id-und-medida-13", label: "Galones (gal)" },
                      { value: "id-und-medida-14", label: "Metros cúbicos (m3)" },
                      { value: "id-und-medida-15", label: "Centímetros cúbicos (cm3)" },
                      { value: "id-und-medida-16", label: "Milímetros cúbicos (mm3)" },
                      { value: "id-und-medida-17", label: "Kilovatios-hora (kWh)" },
                      { value: "id-und-medida-18", label: "Unidad Térmica Británica (BTU)" },
                      { value: "id-und-medida-19", label: "Metros cuadrados (m2)" },
                      { value: "id-und-medida-20", label: "Pies (ft)" },
                    ]}
                    {...field}
                  />
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
