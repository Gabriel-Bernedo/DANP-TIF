export interface ICarritoDetalle {
  id: number;
  carrito_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
}

export interface ICarrito {
  id: number;
  usuario_id: number;
  fecha_creacion: string;
  estado: string;
  detalles?: ICarritoDetalle[];
}
