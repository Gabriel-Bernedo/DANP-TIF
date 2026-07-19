import { Prisma } from '../../generated/prisma/client';

export const administradoresData = [
  {
    nombre: 'Administrador Principal',
    email: 'admin@admin.com',
    rol: 'SuperAdmin',
  },
  {
    nombre: 'Gerente Ventas',
    email: 'ventas@admin.com',
    rol: 'SalesAdmin',
  },
];

export const usuariosData = [
  {
    nombre: 'Gabriel',
    apellido: 'Bernedo',
    email: 'gabo@example.com',
    telefono: '555-0100',
    direccion: 'Calle Falsa 123',
    estado: 'activo',
  },
  {
    nombre: 'María',
    apellido: 'Gómez',
    email: 'maria@example.com',
    telefono: '555-0101',
    direccion: 'Avenida Siempre Viva 742',
    estado: 'activo',
  },
];

export const categoriasData = [
  { nombre: 'Frutas y Verduras', descripcion: 'Productos frescos y saludables' },
  { nombre: 'Lácteos', descripcion: 'Leche, quesos y derivados' },
  { nombre: 'Panadería', descripcion: 'Panes y pasteles' },
];

export const getProductosData = (adminId: number, catFrutasId: number, catLacteosId: number, catPanaderiaId: number) => [
  {
    nombre: 'Manzanas Orgánicas (1kg)',
    descripcion: 'Manzanas frescas con ligero detalle estético',
    precio_original: 5.0,
    precio_descuento: 2.5,
    cantidad_disponible: 20,
    fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 3)), // Expira en 3 días
    estado: 'disponible',
    categoria_id: catFrutasId,
    administrador_id: adminId,
  },
  {
    nombre: 'Queso Fresco (500g)',
    descripcion: 'Queso próximo a caducar',
    precio_original: 8.0,
    precio_descuento: 4.0,
    cantidad_disponible: 15,
    fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 2)), // Expira en 2 días
    estado: 'disponible',
    categoria_id: catLacteosId,
    administrador_id: adminId,
  },
  {
    nombre: 'Pack de Pan Integral',
    descripcion: 'Pan del día anterior',
    precio_original: 4.0,
    precio_descuento: 1.5,
    cantidad_disponible: 30,
    fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 1)), // Expira mañana
    estado: 'disponible',
    categoria_id: catPanaderiaId,
    administrador_id: adminId,
  },
];

export const getOfertasData = (productoId1: number, productoId2: number) => [
  {
    producto_id: productoId1,
    porcentaje_descuento: 50.0,
    fecha_inicio: new Date(),
    fecha_fin: new Date(new Date().setDate(new Date().getDate() + 2)),
    estado: 'activa',
  },
  {
    producto_id: productoId2,
    porcentaje_descuento: 60.0,
    fecha_inicio: new Date(),
    fecha_fin: new Date(new Date().setDate(new Date().getDate() + 1)),
    estado: 'activa',
  },
];
