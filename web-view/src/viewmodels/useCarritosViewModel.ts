import { useState, useEffect, useCallback } from 'react';
import { carritoService } from '../core/di/container';
import type { ICarrito } from '../models/ICarrito';

export function useCarritosViewModel() {
  const [carritos, setCarritos] = useState<ICarrito[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCarritos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await carritoService.getCarritos();
      setCarritos(data);
    } catch (error) {
      console.error("Error cargando carritos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCarritos();
  }, [loadCarritos]);

  const handleDelete = (id: number) => {
    setCarritos(prev => prev.filter(c => c.id !== id));
  };

  return {
    carritos,
    isLoading,
    handleDelete,
    refresh: loadCarritos
  };
}
