import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../core/di/container';
import type { IEstadisticas } from '../models/IDashboard';

export function useDashboardViewModel() {
  const [estadisticas, setEstadisticas] = useState<IEstadisticas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const loadEstadisticas = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await dashboardService.getEstadisticas(
        startDate || undefined,
        endDate || undefined
      );
      setEstadisticas(data);
    } catch (error) {
      console.error("Error cargando estadísticas:", error);
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    loadEstadisticas();
  }, [loadEstadisticas]);

  return {
    estadisticas,
    isLoading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    refresh: loadEstadisticas
  };
}
