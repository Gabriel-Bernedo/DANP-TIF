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

  const handleDelete = async (id: number) => {
    try {
      await ofertaService.deleteOferta(id);
      setOfertas(prev => prev.filter(c => c.id !== id));
    } catch(err) {
      console.error("Error deleting:", err);
      throw err;
    }
  };

  const handleUpdate = async (id: number, data: Partial<IOferta>) => {
    try {
      await ofertaService.updateOferta(id, data);
      setOfertas(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    } catch (error) {
      console.error("Error updating:", error);
      throw error;
    }
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
    handleUpdate,
    ofertas,
    isLoading,
    handleDelete,
    refresh: loadOfertas
  };
}
