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

  return {
    ofertas,
    isLoading,
    handleDelete,
    refresh: loadOfertas
  };
}
