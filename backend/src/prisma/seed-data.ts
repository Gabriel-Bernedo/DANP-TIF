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
  {
    nombre: 'Carlos',
    apellido: 'López',
    email: 'carlos@example.com',
    telefono: '555-0102',
    direccion: 'Av Principal 456',
    estado: 'activo',
  },
  {
    nombre: 'Ana',
    apellido: 'Torres',
    email: 'ana@example.com',
    telefono: '555-0103',
    direccion: 'Jr. Los Pinos 789',
    estado: 'activo',
  },
  {
    nombre: 'Luis',
    apellido: 'Martínez',
    email: 'luis@example.com',
    telefono: '555-0104',
    direccion: 'Plaza Mayor 101',
    estado: 'activo',
  },
];

export const categoriasData = [
  { nombre: 'Frutas y Verduras', descripcion: 'Productos frescos y saludables' },
  { nombre: 'Lácteos', descripcion: 'Leche, quesos y derivados' },
  { nombre: 'Panadería', descripcion: 'Panes y pasteles' },
  { nombre: 'Carnes y Aves', descripcion: 'Carnes frescas y cortes seleccionados' },
  { nombre: 'Bebidas', descripcion: 'Jugos, gaseosas y agua mineral' },
];

export const getProductosData = (adminId: number, categoriaIds: number[]) => {
  const productos: any[] = [];
  const categoriasNombres = ['Frutas', 'Lácteos', 'Panadería', 'Carnes', 'Bebidas'];
  
  for (let i = 0; i < categoriaIds.length; i++) {
    const catId = categoriaIds[i];
    const catNombre = categoriasNombres[i] || 'Producto';
    
    for (let j = 1; j <= 20; j++) {
      const precioOrig = Number((Math.random() * 50 + 5).toFixed(2));
      const hasDiscount = Math.random() > 0.7;
      const precioDesc = hasDiscount ? Number((precioOrig * (0.5 + Math.random() * 0.4)).toFixed(2)) : null;
      
      productos.push({
        nombre: `${catNombre} Especial ${j}`,
        descripcion: `Descripción detallada para el producto ${j} de la categoría ${catNombre}.`,
        precio_original: precioOrig,
        precio_descuento: precioDesc,
        cantidad_disponible: Math.floor(Math.random() * 100) + 10,
        fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 30) + 5)),
        estado: 'disponible',
        categoria_id: catId,
        administrador_id: adminId,
      });
    }
  }
  return productos;
};

export const getOfertasData = (productosIds: number[]) => {
  const ofertas: any[] = [];
  const shuffled = [...productosIds].sort(() => 0.5 - Math.random());
  const selectedIds = shuffled.slice(0, 10);
  
  for (const pId of selectedIds) {
    ofertas.push({
      producto_id: pId,
      porcentaje_descuento: Number((Math.random() * 40 + 10).toFixed(2)),
      fecha_inicio: new Date(),
      fecha_fin: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 7) + 1)),
      estado: 'activa',
    });
  }
  return ofertas;
};
