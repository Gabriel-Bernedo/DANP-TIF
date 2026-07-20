import React, { useState, useEffect } from 'react';
import type { ICarrito } from '../../../models/ICarrito';
import type { IUser } from '../../../models/IUser';

interface CarritoFormProps {
  users: IUser[];
  onSubmit: (data: Partial<ICarrito>) => Promise<void>;
  initialData?: ICarrito;
  onCancel: () => void;
}

export function CarritoForm({ users, onSubmit, onCancel, initialData }: CarritoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialData || { usuario_id: '',
    estado: 'activo' });

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
      setFormData({ usuario_id: '',
    estado: 'activo' });
    }
  }, [initialData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: Partial<ICarrito> = {
        ...formData,
        usuario_id: parseInt(formData.usuario_id.toString(), 10),
      };
      await onSubmit(payload);
    } catch (error) {
      console.error('Failed to submit form', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm mb-4">
        <strong>Nota:</strong> Este formulario crea un carrito vacío. Los detalles de los productos deben añadirse posteriormente.
      </div>

      <div>
        <label htmlFor="usuario_id" className="block text-sm font-medium text-gray-700 mb-1">Usuario Propietario *</label>
        <select
          id="usuario_id"
          name="usuario_id"
          required
          value={formData.usuario_id}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
        >
          <option value="" disabled>Selecciona un usuario</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.nombre} {u.apellido}</option>
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
          <option value="activo">Activo</option>
          <option value="abandonado">Abandonado</option>
          <option value="completado">Completado</option>
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
          disabled={isSubmitting || !formData.usuario_id}
        >
          {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Carrito'}
        </button>
      </div>
    </form>
  );
}
