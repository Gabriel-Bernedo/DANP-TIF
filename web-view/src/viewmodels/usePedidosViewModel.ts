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

  const handleDelete = (id: number) => {
    setPedidos(prev => prev.filter(p => p.id !== id));
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
    pedidos,
    isLoading,
    handleDelete,
    refresh: loadPedidos
  };
}
