import React, { useState, useEffect } from 'react';
import type { IAdmin } from '../../../models/IAdmin';

interface AdminFormProps {
  onSubmit: (data: Partial<IAdmin>) => Promise<void>;
  initialData?: IAdmin;
  onCancel: () => void;
}

export function AdminForm({ onSubmit, onCancel, initialData }: AdminFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialData || { nombre: '',
    email: '',
    password_hash: '',
    rol: 'gestor_productos' });

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
    email: '',
    password_hash: '',
    rol: 'gestor_productos' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="password_hash" className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
        <input
          type="password"
          id="password_hash"
          name="password_hash"
          required
          value={formData.password_hash}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">Rol del Administrador</label>
        <select
          id="rol"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
        >
          <option value="SuperAdmin">Super Administrador</option>
          <option value="gestor_productos">Gestor de Productos</option>
          <option value="gestor_ventas">Gestor de Ventas</option>
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
          disabled={isSubmitting || !formData.email || !formData.password_hash}
        >
          {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Administrador'}
        </button>
      </div>
    </form>
  );
}
