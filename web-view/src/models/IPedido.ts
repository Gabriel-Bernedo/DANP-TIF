export interface IPedidoDetalle {
  id: number;
  pedido_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface IPedido {
  id: number;
  usuario_id: number;
  fecha_pedido: string;
  fecha_entrega_estimada: string;
  direccion_entrega: string;
  metodo_pago: string;
  estado: string;
  total: number;
  detalles?: IPedidoDetalle[];
}
