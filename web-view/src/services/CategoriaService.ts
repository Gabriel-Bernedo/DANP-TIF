import type { ICategoria } from '../models/ICategoria';

export class CategoriaService {
  static async getCategorias(): Promise<ICategoria[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, nombre: 'Electrónica', descripcion: 'Dispositivos y gadgets tecnológicos' },
          { id: 2, nombre: 'Oficina', descripcion: 'Mobiliario y útiles para oficina' },
          { id: 3, nombre: 'Accesorios', descripcion: 'Complementos varios' },
        ]);
      }, 500);
    });
  }
}
