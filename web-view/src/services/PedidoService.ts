import type { IPedido } from '../models/IPedido';

export class PedidoService {
  static async getPedidos(): Promise<IPedido[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { 
            id: 1, 
            usuario_id: 1, 
            fecha_pedido: new Date().toISOString(), 
            fecha_entrega_estimada: new Date(Date.now() + 172800000).toISOString(), 
            direccion_entrega: 'Calle Principal 123', 
            metodo_pago: 'Tarjeta Crédito', 
            estado: 'Procesando', 
            total: 1299.99,
            detalles: [
              { id: 1, pedido_id: 1, producto_id: 1, cantidad: 1, precio_unitario: 1299.99, subtotal: 1299.99 }
            ]
          },
        ]);
      }, 700);
    });
  }
}
