import { useState, useEffect, useCallback } from 'react';
import { categoriaService } from '../core/di/container';
import type { ICategoria } from '../models/ICategoria';

export function useCategoriasViewModel() {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategorias = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await categoriaService.getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

  const handleDelete = async (id: number) => {
    try {
      await categoriaService.deleteCategoria(id);
      setCategorias(prev => prev.filter(c => c.id !== id));
    } catch(err) {
      console.error("Error deleting:", err);
      throw err;
    }
  };

  const handleUpdate = async (id: number, data: Partial<ICategoria>) => {
    try {
      await categoriaService.updateCategoria(id, data);
      setCategorias(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    } catch (error) {
      console.error("Error updating:", error);
      throw error;
    }
  };

  
  const handleCreate = async (data: Partial<ICategoria>) => {
    try {
      const created = await categoriaService.createCategoria(data);
      setCategorias(prev => [...prev, created]);
    } catch (error) {
      console.error("Error creating:", error);
      throw error;
    }
  };

  return {
    handleCreate,
    handleUpdate,
    categorias,
    isLoading,
    handleDelete,
    refresh: loadCategorias
  };
}
