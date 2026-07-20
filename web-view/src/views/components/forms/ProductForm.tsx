import React, { useState, useEffect } from 'react';
import type { IProduct } from '../../../models/IProduct';
import type { ICategoria } from '../../../models/ICategoria';

interface ProductFormProps {
  categories: ICategoria[];
  onSubmit: (data: Partial<IProduct>) => Promise<void>;
  initialData?: IProduct;
  onCancel: () => void;
}

export function ProductForm({ categories, onSubmit, onCancel, initialData }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || '',
    descripcion: initialData?.descripcion || '',
    precio_original: initialData?.precio_original?.toString() || '',
    precio_descuento: initialData?.precio_descuento?.toString() || '',
    cantidad_disponible: initialData?.cantidad_disponible?.toString() || '0',
    fecha_vencimiento: initialData?.fecha_vencimiento 
      ? (typeof initialData.fecha_vencimiento === 'string' && initialData.fecha_vencimiento.includes('T') 
          ? initialData.fecha_vencimiento.split('T')[0] 
          : new Date(initialData.fecha_vencimiento).toISOString().split('T')[0])
      : '',
    imagen_url: initialData?.imagen_url || '',
    estado: initialData?.estado || 'disponible',
    categoria_id: initialData?.categoria_id?.toString() || '',
    administrador_id: initialData?.administrador_id?.toString() || '1'
  });

  
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        descripcion: initialData.descripcion || '',
        precio_original: initialData.precio_original?.toString() || '',
        precio_descuento: initialData.precio_descuento?.toString() || '',
        cantidad_disponible: initialData.cantidad_disponible?.toString() || '0',
        fecha_vencimiento: initialData.fecha_vencimiento 
          ? (typeof initialData.fecha_vencimiento === 'string' && initialData.fecha_vencimiento.includes('T') 
              ? initialData.fecha_vencimiento.split('T')[0] 
              : new Date(initialData.fecha_vencimiento).toISOString().split('T')[0])
          : '',
        imagen_url: initialData.imagen_url || '',
        estado: initialData.estado || 'disponible',
        categoria_id: initialData.categoria_id?.toString() || '',
        administrador_id: initialData.administrador_id?.toString() || '1'
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        precio_original: '',
        precio_descuento: '',
        cantidad_disponible: '0',
        fecha_vencimiento: '',
        imagen_url: '',
        estado: 'disponible',
        categoria_id: '',
        administrador_id: '1'
      });
    }
  }, [initialData]);
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: Partial<IProduct> = {
        ...formData,
        precio_original: parseFloat(formData.precio_original),
        precio_descuento: formData.precio_descuento ? parseFloat(formData.precio_descuento) : undefined,
        cantidad_disponible: parseInt(formData.cantidad_disponible, 10),
        categoria_id: parseInt(formData.categoria_id, 10),
        administrador_id: parseInt(formData.administrador_id, 10),
        // Send date as ISO string if present
        fecha_vencimiento: formData.fecha_vencimiento ? new Date(formData.fecha_vencimiento).toISOString() : undefined
      };
      await onSubmit(payload);
    } catch (error) {
      console.error('Failed to submit form', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Ej: Manzanas Orgánicas"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={2}
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
            placeholder="Describe el producto..."
          />
        </div>

        <div>
          <label htmlFor="precio_original" className="block text-sm font-medium text-gray-700 mb-1">Precio Original *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              id="precio_original"
              name="precio_original"
              required
              value={formData.precio_original}
              onChange={handleChange}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="precio_descuento" className="block text-sm font-medium text-gray-700 mb-1">Precio c/ Descuento</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              id="precio_descuento"
              name="precio_descuento"
              value={formData.precio_descuento}
              onChange={handleChange}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="cantidad_disponible" className="block text-sm font-medium text-gray-700 mb-1">Stock Disponible *</label>
          <input
            type="number"
            id="cantidad_disponible"
            name="cantidad_disponible"
            required
            value={formData.cantidad_disponible}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="fecha_vencimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento *</label>
          <input
            type="date"
            id="fecha_vencimiento"
            name="fecha_vencimiento"
            required
            value={formData.fecha_vencimiento}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="imagen_url" className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen</label>
          <input
            type="url"
            id="imagen_url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div>
          <label htmlFor="categoria_id" className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
          <select
            id="categoria_id"
            name="categoria_id"
            required
            value={formData.categoria_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
          >
            <option value="" disabled>Selecciona una categoría</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
          >
            <option value="disponible">Disponible</option>
            <option value="agotado">Agotado</option>
            <option value="retirado">Retirado</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-500/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isSubmitting || !formData.nombre.trim() || !formData.categoria_id}
        >
          {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Producto'}
        </button>
      </div>
    </form>
  );
}
