"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categorySchema } from "@/utils/zod/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import toasterCustom from "../toaster-custom";
import { createCategory, updateCategory } from "@/actions/category-actions";

interface ChildComponentProps {
  setOpen: (open: boolean) => void;
  data: z.infer<typeof categorySchema>;
  idEdit?: string;
}

export function FormCategory({ setOpen, data, idEdit }: ChildComponentProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: data ? { category: data.category, description: data.description } : {},
  });

  async function onSubmitUpdate(id: string, values: z.infer<typeof categorySchema>) {
    console.log(values);
    toasterCustom(0);
    const data = await updateCategory(id, values);

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
      form.setError("category", { type: "error", message: data.message });
      form.setFocus("category");
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);

      setOpen(false);
    }
  }

  async function onSubmitCreate(values: z.infer<typeof categorySchema>) {
    toasterCustom(0);
    const data = await createCategory(values);
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
      form.setError("category", { type: "error", message: data.message });
      form.setFocus("category");
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);

      setOpen(false);
    }
  }

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    if (idEdit) {
      await onSubmitUpdate(idEdit, values);
    } else {
      await onSubmitCreate(values);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category" // Cambié 'firstName' a 'ProductName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria del Producto:</FormLabel>
              <FormControl>
                <Input placeholder="Ejemplo: Eléctronica" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description" // Cambié 'lastName' a 'code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción:</FormLabel>
              <FormControl>
                <Input placeholder="Descripción" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        <div className="flex justify-center py-3">
          <Button type="submit">{idEdit ? "Actualizar" : "Guardar"}</Button>
        </div>
      </form>
    </Form>
  );
}
