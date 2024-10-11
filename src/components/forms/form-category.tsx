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
import { categorySchema } from "@/utils/zod/schemas";

export function FormCategory() {
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
    });

    function onSubmit(values: z.infer<typeof categorySchema>) {
        console.log(values)
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
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </Form>
    );
}
