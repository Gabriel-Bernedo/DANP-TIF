import React, { useState, useEffect } from 'react';
import type { ICategoria } from '../../../models/ICategoria';

interface CategoryFormProps {
  onSubmit: (data: Partial<ICategoria>) => Promise<void>;
  initialData?: ICategoria;
  onCancel: () => void;
}

export function CategoryForm({ onSubmit, onCancel, initialData }: CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialData || { nombre: '',
    descripcion: '' });

  useEffect(() => {
    if (initialData) {
      // Ensure no null values are passed to inputs
      const cleanData = { ...initialData };
      for (const key in cleanData) {
        if ((cleanData as any)[key] === null) {
          (cleanData as any)[key] = '';
        }
      }
      setFormData(cleanData as any);
    } else {
      setFormData({ nombre: '',
    descripcion: '' });
    }
  }, [initialData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Failed to submit form', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Categoría *</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          placeholder="Ej: Frutas y Verduras"
        />
      </div>

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
          placeholder="Describe brevemente esta categoría..."
        />
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
          disabled={isSubmitting || !formData.nombre.trim()}
        >
          {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Categoría'}
        </button>
      </div>
    </form>
  );
}
