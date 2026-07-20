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

  const handleDelete = async (id: number) => {
    try {
      await carritoService.deleteCarrito(id);
      setCarritos(prev => prev.filter(c => c.id !== id));
    } catch(err) {
      console.error("Error deleting:", err);
      throw err;
    }
  };

  const handleUpdate = async (id: number, data: Partial<ICarrito>) => {
    try {
      await carritoService.updateCarrito(id, data);
      setCarritos(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    } catch (error) {
      console.error("Error updating:", error);
      throw error;
    }
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
    handleUpdate,
    carritos,
    isLoading,
    handleDelete,
    refresh: loadCarritos
  };
}
