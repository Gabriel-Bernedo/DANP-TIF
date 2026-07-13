import type { IProduct } from '../models/IProduct';

export class ProductService {
  static async getProducts(): Promise<IProduct[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, nombre: 'Laptop Pro X', descripcion: 'Laptop de alta gama', precio_original: 1299.99, precio_descuento: 1199.99, cantidad_disponible: 45, fecha_vencimiento: '2027-12-31', fecha_publicacion: new Date().toISOString(), imagen_url: 'url', estado: 'Activo', categoria_id: 1, administrador_id: 1 },
          { id: 2, nombre: 'Silla Ergonómica V2', descripcion: 'Silla para oficina', precio_original: 249.50, precio_descuento: 249.50, cantidad_disponible: 5, fecha_vencimiento: '2030-01-01', fecha_publicacion: new Date().toISOString(), imagen_url: 'url', estado: 'Activo', categoria_id: 2, administrador_id: 1 },
          { id: 3, nombre: 'Auriculares Inalámbricos', descripcion: 'Audio HQ', precio_original: 89.99, precio_descuento: 79.99, cantidad_disponible: 0, fecha_vencimiento: '2028-05-05', fecha_publicacion: new Date().toISOString(), imagen_url: 'url', estado: 'Agotado', categoria_id: 3, administrador_id: 1 },
        ]);
      }, 700);
    });
  }
}
