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

  const handleDelete = (id: number) => {
    setCategorias(prev => prev.filter(c => c.id !== id));
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
    categorias,
    isLoading,
    handleDelete,
    refresh: loadCategorias
  };
}
