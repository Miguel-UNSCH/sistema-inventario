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
import { SelectFilter } from "@/components/select/select-filter"; // Importa el nuevo componente
import { createProduct } from "@/lib/actions";

const categories = [
    { value: "Electrónica", label: "Electrónica" },
    { value: "Vestimenta", label: "Vestimenta" },
    { value: "Muebles", label: "Muebles" }
]; // Array de categorías actualizado

export function FormProduct() {
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
    });

    function onSubmit(values: z.infer<typeof productSchema>) {
        createProduct(values)
        console.log(values)
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
                            <FormLabel>Reservas:</FormLabel>
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
                        <FormItem>
                            <FormLabel>Categoría:</FormLabel>
                            <FormControl>
                                <SelectFilter
                                    options={categories}
                                    placeholder="Selecciona una categoría"
                                    {...field} // Esto pasa `value` y `onChange`
                                />
                            </FormControl>
                            <FormMessage className="text-end text-white" />
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
