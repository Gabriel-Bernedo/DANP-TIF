import { useState, useEffect, useCallback } from 'react';
import { RecordModel, type RecordItem } from '../models/RecordModel';

export function useAdminViewModel() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await RecordModel.getRecords();
      setRecords(data);
    } catch (error) {
      console.error("Error cargando registros:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const handleDelete = (id: string) => {
    // Optimistic UI update
    setRecords(prev => prev.filter(r => r.id !== id));
    // Aquí llamaríamos al Model para eliminar en backend
  };

  return {
    records,
    isLoading,
    handleDelete,
    refresh: loadRecords
  };
}
