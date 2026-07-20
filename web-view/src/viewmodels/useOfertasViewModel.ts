import { useState, useEffect, useCallback } from 'react';
import { ofertaService } from '../core/di/container';
import type { IOferta } from '../models/IOferta';

export function useOfertasViewModel() {
  const [ofertas, setOfertas] = useState<IOferta[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOfertas = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await ofertaService.getOfertas();
      setOfertas(data);
    } catch (error) {
      console.error("Error cargando ofertas:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOfertas();
  }, [loadOfertas]);

  const handleDelete = (id: number) => {
    setOfertas(prev => prev.filter(o => o.id !== id));
  };

  
  const handleCreate = async (data: Partial<IOferta>) => {
    try {
      const created = await ofertaService.createOferta(data);
      setOfertas(prev => [...prev, created]);
    } catch (error) {
      console.error("Error creating:", error);
      throw error;
    }
  };

  return {
    handleCreate,
    ofertas,
    isLoading,
    handleDelete,
    refresh: loadOfertas
  };
}
