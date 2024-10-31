import { z } from 'zod';

export const personaNaturalSchema = z.object({
  firstName: z.string({required_error: "Ingrese nombre del cliente"}).min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  lastName: z.string({required_error: "Ingrese apellido del cliente"}).min(3, "El apellido debe tener al menos 3 caracteres"),
  identifier: z.string({required_error: "Ingrese dni o pasaporte"}),
  email: z.string({required_error: "Ingrese correo del cliente"}).email("Correo electrónico no válido"),
  phone: z.string({required_error: "Ingrese número del cliente"})
    .regex(/^\d+$/, "El teléfono solo puede contener números")
    .min(9, "El teléfono debe tener al menos 9 dígitos"),
  address: z.string().optional(),
  createdBy: z.object({
    userId: z.string(),  // ID del usuario que registra
    name: z.string(),    // Nombre del usuario que registra
  }).optional(),
});

export const personaJuridicaSchema = z.object({
  companyName: z.string({required_error: "Ingrese razón social"}).min(5, "La razón social debe tener al menos 5 caracteres"),
  ruc: z.string({required_error: "Ingrese ruc de la compañia"})
    .regex(/^\d{11}$/, "El RUC debe tener 11 dígitos"),
  representativeName: z.string({required_error: "Ingrese nombre de representante"}).min(5, "Ingrese por lo menos 5 caracteres"),
  representativePosition: z.string().optional(),
  email: z.string({required_error: "Ingrese correo de la compañia"}).email("Correo electrónico no válido"),
  phone: z.string({required_error: "Ingrese número de la compañia"})
    .regex(/^\d+$/, "El teléfono solo puede contener números")
    .min(9, "El teléfono debe tener al menos 9 dígitos"),
  address: z.string().optional(),
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
  productName: z.string({ required_error: "El nombre del producto es obligatorio" }).min(1, "El nombre del producto es obligatorio"),
  code: z.string({ required_error: "El código es obligatorio" }).min(1, "El código es obligatorio"),
  description: z.string().optional(),
  stockMinimo: z.union([
    z.string().transform((val) => parseFloat(val)), // Acepta string y lo convierte
    z.number() // Acepta números
  ]).refine((val) => !isNaN(val), {
    message: "El stock mínimo debe ser un número válido",
  }),
  categoryId: z.string({ required_error: "Seleccione una categoría" }).min(1, "La categoría es obligatoria"),
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

// ======================= ENTRADAS ESQUEMA ==================

export const entradasSchema = z.object({
  productId: z.string({ required_error: "Seleccione un producto" }),
  cantidad: z.union([
    z.string({required_error: 'Ingrese cantidad'}).transform((val) => parseFloat(val)),
    z.number() // Acepta números
  ]).refine((val) => !isNaN(val), {
    message: "La cantidad debe ser un número válido",
  }),
  precioCompra: z.union([
    z.string({required_error: 'Ingrese precio compra'}).transform((val) => parseFloat(val)),
    z.number() // Acepta números
  ]).refine((val) => !isNaN(val), {
    message: "El precio debe ser un número válido",
  }),
  precioVenta: z.union([
    z.string({required_error: 'Ingrese precio venta'}).transform((val) => parseFloat(val)),
    z.number() // Acepta números
  ]).refine((val) => !isNaN(val), {
    message: "El precio debe ser un número válido",
  }),
  unidadId: z.string({required_error: 'Seleccione unidad de medida'}),
  proveedorId: z.string({required_error: 'Seleccione un proveedor'}),
})

export const salidasSchema = z.object({
  clientId: z.string({ required_error: "Seleccione un cliente" }),
  entradaId: z.string({ required_error: "Seleccione un producto" }),
  cantidad:z.union([
    z.string({required_error: 'Ingrese cantidad'}).transform((val) => parseFloat(val)),
    z.number() // Acepta números
  ]).refine((val) => !isNaN(val), {
    message: "La cantidad debe ser un número válido",
  }),
  precioVenta: z.union([
    z.string({required_error: 'Ingrese Precio de venta'}).transform((val) => parseFloat(val)),
    z.number() // Acepta números
  ]).refine((val) => !isNaN(val), {
    message: "La cantidad debe ser un número válido",
  }),
  tipoDescuento: z.string().optional(),
  descuento: z.union([
    z.string({required_error: 'Ingrese cantidad'}).transform((val) => parseFloat(val)),
    z.number() // Acepta números
  ]).refine((val) => !isNaN(val), {
    message: "La cantidad debe ser un número válido",
  }).optional(),
});

// Esquema para actualizar el usuario
export const updateUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email({ message: "Debe ser un correo electrónico válido" }).optional(),
  user: z.string({ required_error: "El nombre de usuario es obligatorio" }),
  password: z.string({ required_error: "Campo obligatorio" })
    .min(1, "Campo obligatorio"),
  newPassword: z.string({ required_error: "Campo obligatorio" })
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
  confirmNewPassword: z.string({ required_error: "Campo obligatorio" })
}).refine((data) => !data.newPassword || data.newPassword === data.confirmNewPassword, {
  message: "La nueva contraseña y la confirmación no coinciden",
  path: ["confirmNewPassword"],
});