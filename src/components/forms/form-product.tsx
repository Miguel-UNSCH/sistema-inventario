"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/utils/zod/schemas";
import { createProducto, updateProducto } from "@/lib/actions";
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import toasterCustom from "../toaster-custom"
import { Combobox } from "@/components/select/combobox";


interface ChildComponentProps {
    setOpen: (open: boolean) => void;
    data: z.infer<typeof productSchema>
    idEdit?: string
}

const categories = [
    { value: "Electrónica", label: "Electrónica" },
    { value: "Vestimenta", label: "Vestimenta" },
    { value: "Muebles", label: "Muebles" }
];

const suppliers = [
    { value: "Proveedor A", label: "Proveedor A" },
    { value: "Proveedor B", label: "Proveedor B" },
    { value: "Proveedor C", label: "Proveedor C" },
    { value: "Proveedor D", label: "Proveedor D" }
];


export function FormProduct({ setOpen, data, idEdit }: ChildComponentProps) {

    const router = useRouter();

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: data ? {
            productName: data.productName,
            code: data.code,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category,
            supplier: data.category,
        } : {}
    });

    async function onSubmitUpdate(id: string, values: z.infer<typeof productSchema>) {
        console.log(values);
        toasterCustom(0);
        const data = await updateProducto(id, values);

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
            form.setError("productName", { type: "error", message: data.message });
            form.setFocus("productName");
        }
    }

    async function onSubmitCreate(values: z.infer<typeof productSchema>) {
        toasterCustom(0);
        const data = await createProducto(values);

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
            form.setError("productName", { type: "error", message: data.message });
            form.setFocus("productName");
        }
    }

    async function onSubmit(values: z.infer<typeof productSchema>) {
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
                    name="productName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Producto:</FormLabel>
                            <FormControl>
                                <Input placeholder="Nombre del producto" {...field} />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código:</FormLabel>
                            <FormControl>
                                <Input placeholder="Código del producto" {...field} />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción:</FormLabel>
                            <FormControl>
                                <Input placeholder="Descripción del producto" {...field} />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio:</FormLabel>
                            <FormControl>
                                <Input placeholder="Precio del producto" {...field} />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stock:</FormLabel>
                            <FormControl>
                                <Input placeholder="Número de reservas" {...field} />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel>Categoría:</FormLabel>
                            <FormControl>
                                <Combobox
                                    options={categories}
                                    placeholder="Selecciona una categoría"
                                    {...field} // Esto pasa `value` y `onChange`
                                />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel>Proveedor:</FormLabel>
                            <FormControl>
                                <Combobox
                                    options={suppliers}
                                    placeholder="Selecciona un proveedor"
                                    {...field} // Esto pasa `value` y `onChange`
                                />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center py-3">
                    <Button type="submit">
                        {idEdit ? "Actualizar" : "Guardar"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
