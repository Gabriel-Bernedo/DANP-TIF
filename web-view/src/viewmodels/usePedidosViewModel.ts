import { useState, useEffect, useCallback } from 'react';
import { PedidoService } from '../services/PedidoService';
import type { IPedido } from '../models/IPedido';

export function usePedidosViewModel() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPedidos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await PedidoService.getPedidos();
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

  return {
    pedidos,
    isLoading,
    handleDelete,
    refresh: loadPedidos
  };
}
