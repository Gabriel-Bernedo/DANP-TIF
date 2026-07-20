import React, { useState, useEffect } from 'react';
import type { IOferta } from '../../../models/IOferta';
import type { IProduct } from '../../../models/IProduct';

interface OfferFormProps {
  products: IProduct[];
  onSubmit: (data: Partial<IOferta>) => Promise<void>;
  initialData?: IOferta;
  onCancel: () => void;
}

export function OfferForm({ products, onSubmit, onCancel, initialData }: OfferFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialData || { producto_id: '',
    porcentaje_descuento: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: 'activa' });

  useEffect(() => {
    if (initialData) {
      // Ensure no null values are passed to inputs
      const cleanData = { ...initialData };
      for (const key in cleanData) {
        if (cleanData[key] === null) {
          cleanData[key] = '';
        }
      }
      setFormData(cleanData as any);
    } else {
      setFormData({ producto_id: '',
    porcentaje_descuento: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: 'activa' });
    }
  }, [initialData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: Partial<IOferta> = {
        ...formData,
        producto_id: parseInt(formData.producto_id, 10),
        porcentaje_descuento: parseFloat(formData.porcentaje_descuento),
        fecha_inicio: new Date(formData.fecha_inicio).toISOString(),
        fecha_fin: new Date(formData.fecha_fin).toISOString()
      };
      await onSubmit(payload);
    } catch (error) {
      console.error('Failed to submit form', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="producto_id" className="block text-sm font-medium text-gray-700 mb-1">Producto Aplicable *</label>
        <select
          id="producto_id"
          name="producto_id"
          required
          value={formData.producto_id}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
        >
          <option value="" disabled>Selecciona un producto</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="porcentaje_descuento" className="block text-sm font-medium text-gray-700 mb-1">Porcentaje de Descuento (%) *</label>
        <div className="relative">
          <input
            type="number"
            step="0.01"
            id="porcentaje_descuento"
            name="porcentaje_descuento"
            required
            value={formData.porcentaje_descuento}
            onChange={handleChange}
            className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Ej: 15.50"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio *</label>
          <input
            type="datetime-local"
            id="fecha_inicio"
            name="fecha_inicio"
            required
            value={formData.fecha_inicio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="fecha_fin" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin *</label>
          <input
            type="datetime-local"
            id="fecha_fin"
            name="fecha_fin"
            required
            value={formData.fecha_fin}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>
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
          <option value="activa">Activa</option>
          <option value="inactiva">Inactiva</option>
          <option value="expirada">Expirada</option>
        </select>
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
          disabled={isSubmitting || !formData.producto_id || !formData.porcentaje_descuento}
        >
          {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Oferta'}
        </button>
      </div>
    </form>
  );
}
