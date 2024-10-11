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
  createdById: z.string().min(1, "La categoría es obligatoria"),
});

export const productSchema = z.object({
  productName: z.string().min(1, "El nombre del producto es obligatorio"),
  code: z.string().min(1, "El código es obligatorio"),
  descripción: z.string().optional(),
  price: z.string() // Cambia aquí a z.number()
    .regex(/^\d+$/, "El precio debe ser un número")
    .min(0.01, "El precio debe ser al menos 0.01"),
  stock: z.string() // Cambia aquí a z.number() también
    .regex(/^\d+$/, "Las reservas deben de ser un número"),
  category: z.string().min(1, "La categoría es obligatoria"),
});

export const supplierSchema = z.object({
  supplierName: z.string()
    .min(2, "El nombre del proveedor es obligatorio")
    .regex(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras y espacios"),

  ruc: z.string()
    .length(11, "El RUC debe tener 11 dígitos")
    .regex(/^\d+$/, "El RUC debe ser un número"),

  email: z.string()
    .email("El correo electrónico no es válido"),

  phone: z.string()
    .min(9, "El teléfono debe tener al menos 9 dígitos")
    .max(15, "El teléfono no puede tener más de 15 dígitos")
    .regex(/^\d+$/, "El teléfono debe ser un número"),

  address: z.string()
    .min(5, "La dirección es obligatoria"),

  productsSupplied: z.array(
    z.object({
      productName: z.string().min(1, "El nombre del producto es obligatorio"),
      productCode: z.string().min(1, "El código del producto es obligatorio"),
    })
  ).min(1, "Debe haber al menos un producto suministrado"),
});
