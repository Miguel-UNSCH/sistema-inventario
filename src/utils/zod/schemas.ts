import { z } from 'zod';

export const personaNaturalSchema = z.object({
  firstName: z.string().min(3, { message: "El nombre es obligatorio" }),
  lastName: z.string().min(3, "El apellido es obligatorio"),
  identifier: z.string()
    .regex(/^\d{8}$/, "La identificación debe tener 8 dígitos")
    .optional(),
  email: z.string().email("Correo electrónico no válido"),
  phone: z.string()
    .regex(/^\d+$/, "El teléfono solo puede contener números")
    .min(9, "El teléfono debe tener al menos 9 dígitos"),
  address: z.string().optional(),
  createdBy: z.object({
    userId: z.string(),  // ID del usuario que registra
    name: z.string(),    // Nombre del usuario que registra
  }).optional(),
});

export const personaJuridicaSchema = z.object({
  companyName: z.string().min(5, "La razón social es obligatoria"),
  ruc: z.string()
    .regex(/^\d{11}$/, "El RUC debe tener 11 dígitos"),
  representativeName: z.string().min(1, "El nombre del representante es obligatorio"),
  representativePosition: z.string().optional(),
  companyEmail: z.string().email("Correo electrónico no válido"),
  companyPhone: z.string()
    .regex(/^\d+$/, "El teléfono solo puede contener números")
    .min(9, "El teléfono debe tener al menos 9 dígitos"),
  companyAddress: z.string().optional(),
  companyType: z.enum(["pequeña", "mediana", "grande"]).optional(),
  createdBy: z.object({
    userId: z.string(),  // ID del usuario que registra
    name: z.string(),    // Nombre del usuario que registra
  }).optional(),
});

export const categorySchema = z.object({
  category: z.string().min(1, "El nombre de la categoría es obligatorio"),
  description: z.string().optional(),
});

export const productSchema = z.object({
  productName: z.string().min(1, "El nombre del producto es obligatorio"),
  code: z.string().min(1, "El código es obligatorio"),
  description: z.string().optional(),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "El precio debe ser un número válido") // Acepta números decimales con hasta 2 decimales
    .refine((value) => parseFloat(value) >= 0.01, {
      message: "El precio debe ser al menos 0.01",
    }),
  stock: z
    .string()
    .regex(/^\d+$/, "Las reservas deben ser un número")
    .refine((value) => parseInt(value) >= 1, {
      message: "Las reservas deben ser al menos 1",
    }),
  category: z.enum(["Electrónica", "Vestimenta", "Muebles"], {
    invalid_type_error: "La categoría es obligatoria",
  }),
  supplier: z.enum([
    "Proveedor A",
    "Proveedor B",
    "Proveedor C",
    "Proveedor D"
  ], {
    invalid_type_error: "El proveedor es obligatorio",
  }),
});



export const supplierSchema = z.object({
  supplierName: z.string().nonempty("El nombre del proveedor es requerido."),
  ruc: z.string()
    .length(11, "El RUC debe tener 11 caracteres.")
    .regex(/^\d+$/, "El RUC debe contener solo números."),
  email: z.string()
    .email("El correo electrónico no es válido."),
  phone: z.string()
    .regex(/^\d+$/, "El teléfono solo puede contener números")
    .min(9, "El teléfono debe tener al menos 9 dígitos"),
  address: z.string().nonempty("La dirección es requerida."),
});