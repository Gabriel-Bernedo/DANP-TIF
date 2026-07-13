import type { ICarrito } from '../models/ICarrito';

export class CarritoService {
  static async getCarritos(): Promise<ICarrito[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            usuario_id: 2,
            fecha_creacion: new Date(Date.now() - 3600000).toISOString(),
            estado: 'Activo',
            detalles: [
              { id: 1, carrito_id: 1, producto_id: 2, cantidad: 2, precio_unitario: 249.50 }
            ]
          }
        ]);
      }, 500);
    });
  }
}
