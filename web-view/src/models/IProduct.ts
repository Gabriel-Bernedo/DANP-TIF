export interface IProduct {
  id: number;
  nombre: string;
  descripcion: string;
  precio_original: number;
  precio_descuento: number;
  cantidad_disponible: number;
  fecha_vencimiento: string;
  fecha_publicacion: string;
  imagen_url: string;
  estado: string;
  categoria_id: number;
  administrador_id: number;
}
