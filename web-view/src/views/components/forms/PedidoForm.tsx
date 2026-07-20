import React, { useState } from 'react';
import type { IPedido } from '../../../models/IPedido';
import type { IUser } from '../../../models/IUser';

interface PedidoFormProps {
  users: IUser[];
  onSubmit: (data: Partial<IPedido>) => Promise<void>;
  onCancel: () => void;
}

export function PedidoForm({ users, onSubmit, onCancel }: PedidoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    usuario_id: '',
    fecha_entrega_estimada: '',
    direccion_entrega: '',
    metodo_pago: 'Tarjeta',
    estado: 'pendiente',
    total: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload: Partial<IPedido> = {
        ...formData,
        usuario_id: parseInt(formData.usuario_id, 10),
        total: parseFloat(formData.total),
        fecha_entrega_estimada: formData.fecha_entrega_estimada ? new Date(formData.fecha_entrega_estimada).toISOString() : undefined
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
      <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm mb-4">
        <strong>Nota:</strong> Este formulario crea un pedido base. Generalmente los pedidos se generan a partir de un carrito de compras.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="usuario_id" className="block text-sm font-medium text-gray-700 mb-1">Usuario del Pedido *</label>
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
          <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1">Total ($) *</label>
          <input
            type="number"
            step="0.01"
            id="total"
            name="total"
            required
            value={formData.total}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="metodo_pago" className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
          <select
            id="metodo_pago"
            name="metodo_pago"
            value={formData.metodo_pago}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
          >
            <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
            <option value="Efectivo">Efectivo (Contraentrega)</option>
            <option value="Transferencia">Transferencia Bancaria</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="direccion_entrega" className="block text-sm font-medium text-gray-700 mb-1">Dirección de Entrega *</label>
          <input
            type="text"
            id="direccion_entrega"
            name="direccion_entrega"
            required
            value={formData.direccion_entrega}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="fecha_entrega_estimada" className="block text-sm font-medium text-gray-700 mb-1">Entrega Estimada</label>
          <input
            type="datetime-local"
            id="fecha_entrega_estimada"
            name="fecha_entrega_estimada"
            value={formData.fecha_entrega_estimada}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
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
            <option value="pendiente">Pendiente</option>
            <option value="en_camino">En Camino</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
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
          disabled={isSubmitting || !formData.usuario_id || !formData.total || !formData.direccion_entrega}
        >
          {isSubmitting ? 'Guardando...' : 'Crear Pedido'}
        </button>
      </div>
    </form>
  );
}
