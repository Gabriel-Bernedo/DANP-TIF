import { useState, useEffect, useCallback } from 'react';
import { CategoriaService } from '../services/CategoriaService';
import type { ICategoria } from '../models/ICategoria';

export function useCategoriasViewModel() {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategorias = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await CategoriaService.getCategorias();
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

  return {
    categorias,
    isLoading,
    handleDelete,
    refresh: loadCategorias
  };
}
