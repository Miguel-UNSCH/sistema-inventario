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
  category: z.string({required_error: "El nombre de la categoria es obligatorio"}).min(1, "El nombre de la categoría es obligatorio"),
  description: z.string().optional(),
});

export const productSchema = z.object({
  productName: z.string({required_error: "El nombre del producto es obligatorio"}).min(1, "El nombre del producto es obligatorio"),
  code: z.string({required_error: "El código es obligatorio"}).min(1, "El código es obligatorio"),
  description: z.string().optional(),
  price: z
    .string({required_error: "El precio es obligatorio"})
    .regex(/^\d+$/, "El precio debe ser un número válido") // Acepta números decimales con hasta 2 decimales
    .refine((value) => parseFloat(value) >= 0.01, {
      message: "El precio debe ser al menos 0.01",
    }),
  stock: z
    .string({required_error: "El stock es obligatorio"})
    .regex(/^\d+$/, "Las reservas deben ser un número")
    .refine((value) => parseInt(value) >= 1, {
      message: "Las reservas deben ser al menos 1",
    }),
  category: z.string({required_error: "Seleccione una categoria"}).min(1, "La categoría es obligatoria"),
  supplier: z.string({required_error: "Seleccione un proveedor"}).min(1, "El proveedor es obligatorio"),
});

export const supplierSchema = z.object({
  supplierName: z.string()
    .min(3, { message: "El nombre es obligatorio" }), // Valida que el nombre del proveedor tenga al menos 3 caracteres
  ruc: z.string()
    .length(11, "El RUC debe tener 11 caracteres.")  // Valida que el RUC tenga exactamente 11 caracteres
    .regex(/^\d{11}$/, "El RUC debe tener 11 dígitos"), // Valida que el RUC sea un número de 11 dígitos
  email: z.string()
    .email("El correo electrónico no es válido."),   // Valida que el formato del correo electrónico sea correcto
  phone: z.string()
    .regex(/^\d+$/, "El teléfono solo puede contener números") // Valida que el teléfono solo contenga números
    .min(9, "El teléfono debe tener al menos 9 dígitos"),      // Valida que el teléfono tenga al menos 9 dígitos
  address: z.string()
    .min(1, "La dirección es obligatorio"),            // Valida que la dirección no esté vacía
});

// ======================= ROLES ESQUEMAS ==================

export const roleSchema = z.object({
  role: z.string({required_error: "El nombre del rol es obligatorio"}).min(3, "El nombre del rol debe tener al 3 caracteres"),
  description: z.string().optional(),
})

export const permissionSchema = z.object({
  action: z.enum(['crear', 'leer', 'actualizar', 'eliminar'], {
    required_error: 'El campo "acción" es obligatorio.',
  }),
  module: z.enum([
    'inicio', 'clientes', 'reportes', 
    'categorias', 'productos', 'proveedores',
    'entradas', 'salidas',
    'usuarios', 'roles'
  ], {
    required_error: 'El campo "módulos" es obligatorio.',
  }),
  roleId: z.string({required_error: "El campo rol es obligatorio"}).min(1, {
    message: 'El campo "ID de rol" es obligatorio.',
  }),
});

// ======================= USUARIOS ESQUEMAS ==================

export const userSchema = z.object({
  name: z.string({ required_error: "El nombre es obligatorio" }),
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }).optional(),
  image: z.string().url({ message: "Debe ser una URL válida" }).optional().nullable(),
  user: z.string({ required_error: "El usuario es obligatorio" }),
  password: z.string({ required_error: "La contraseña es obligatoria" })
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseñ debe tener al menos 8 caracteres"),
  roleId: z.string({required_error: "El campo rol es obligatorio"}).min(1, {
    message: 'El campo "ID de rol" es obligatorio.',
  }),
  
  // Relaciones opcionales
  accounts: z.array(z.object({})).optional(),  // Relación con Account (definir esquema si es necesario)
  sessions: z.array(z.object({})).optional(),  // Relación con Session
  role: z.object({}).optional().nullable(),  // Relación opcional con Role
  
  personaNaturals: z.array(z.object({})).optional(),  // Relación con PersonaNatural
  personaJuridicas: z.array(z.object({})).optional(),  // Relación con PersonaJuridica
  productos: z.array(z.object({})).optional(),  // Relación con Producto
});

// ======================= LOGIN ESQUEMA ==================

export const signInSchema = z.object({
  username: z.string({ required_error: "Ingrese un usuario" })
    .min(1, "El usuario es necesario"),
  password: z.string({ required_error: "La contraseña es necesaria" })
    .min(1, "La contraseña es necesaria")
})