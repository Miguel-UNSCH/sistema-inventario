import { z } from 'zod';

export const personaNaturalSchema = z.object({
  firstName: z.string().min(3, {message: "El nombre es obligatorio"}),
  lastName: z.string().min(3, "El apellido es obligatorio"),
  dni: z.string()
    .regex(/^\d{8}$/, "El DNI debe tener 8 dígitos")
    .optional(),
  passport: z.string().optional(), // Alternativa al DNI
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
  companyName: z.string().min(1, "La razón social es obligatoria"),
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