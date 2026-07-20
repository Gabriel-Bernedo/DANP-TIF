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

  
  const handleCreate = async (data: Partial<ICarrito>) => {
    try {
      const created = await carritoService.createCarrito(data);
      setCarritos(prev => [...prev, created]);
    } catch (error) {
      console.error("Error creating:", error);
      throw error;
    }
  };

  return {
    handleCreate,
    carritos,
    isLoading,
    handleDelete,
    refresh: loadCarritos
  };
}
