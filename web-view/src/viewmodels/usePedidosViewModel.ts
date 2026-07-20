import { useState, useEffect, useCallback } from 'react';
import { pedidoService } from '../core/di/container';
import type { IPedido } from '../models/IPedido';

export function usePedidosViewModel() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPedidos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await pedidoService.getPedidos();
      setPedidos(data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPedidos();
  }, [loadPedidos]);

  const handleDelete = async (id: number) => {
    try {
      await pedidoService.deletePedido(id);
      setPedidos(prev => prev.filter(c => c.id !== id));
    } catch(err) {
      console.error("Error deleting:", err);
      throw err;
    }
  };

  const handleUpdate = async (id: number, data: Partial<IPedido>) => {
    try {
      await pedidoService.updatePedido(id, data);
      setPedidos(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    } catch (error) {
      console.error("Error updating:", error);
      throw error;
    }
  };

  
  const handleCreate = async (data: Partial<IPedido>) => {
    try {
      const created = await pedidoService.createPedido(data);
      setPedidos(prev => [...prev, created]);
    } catch (error) {
      console.error("Error creating:", error);
      throw error;
    }
  };

  return {
    handleCreate,
    handleUpdate,
    pedidos,
    isLoading,
    handleDelete,
    refresh: loadPedidos
  };
}
