import type { IOferta } from '../models/IOferta';

export class OfertaService {
  static async getOfertas(): Promise<IOferta[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, producto_id: 1, porcentaje_descuento: 15, fecha_inicio: new Date().toISOString(), fecha_fin: new Date(Date.now() + 864000000).toISOString(), estado: 'Activa' },
          { id: 2, producto_id: 2, porcentaje_descuento: 20, fecha_inicio: new Date().toISOString(), fecha_fin: new Date(Date.now() + 1728000000).toISOString(), estado: 'Programada' },
        ]);
      }, 600);
    });
  }
}
