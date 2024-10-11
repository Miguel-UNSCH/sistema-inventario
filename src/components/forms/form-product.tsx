"use client"

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
import { createProduct } from "@/lib/actions";

export function FormProduct() {
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
    });

    function onSubmit(values: z.infer<typeof productSchema>) {
        createProduct(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="productName" // Cambié 'firstName' a 'ProductName'
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
                    name="code" // Cambié 'lastName' a 'code'
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
                    name="descripción" // Cambié 'identifier' a 'descripción'
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
                    name="price" // Asegúrate de que el nombre coincide con tu esquema
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
                    name="stock" // Asegúrate de que el nombre coincide con tu esquema
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reservas:</FormLabel>
                            <FormControl>
                                <Input placeholder="Número de reservas"  {...field} />
                            </FormControl>
                            <FormMessage className="text-end" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category" // Cambia 'address' a 'category'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoría:</FormLabel>
                            <FormControl>
                                <Input placeholder="Categoría del producto" {...field} />
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
