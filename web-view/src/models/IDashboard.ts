export interface IVentaTemporal {
  fecha: string;
  total: number;
}

export interface IProductoVendido {
  producto_id: number;
  nombre: string;
  cantidad_vendida: number;
}

export interface IEstadisticas {
  ingresosTotales: number;
  totalPedidos: number;
  ventasTemporales: IVentaTemporal[];
  productosMasVendidos: IProductoVendido[];
}
