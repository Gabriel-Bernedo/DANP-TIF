import { useState, useEffect, useCallback } from 'react';
import { AdminService } from '../services/AdminService';
import type { IAdmin } from '../models/IAdmin';

export function useAdminsViewModel() {
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAdmins = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await AdminService.getAdmins();
      setAdmins(data);
    } catch (error) {
      console.error("Error cargando administradores:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAdmins();
  }, [loadAdmins]);

  const handleDelete = (id: number) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
  };

  return {
    admins,
    isLoading,
    handleDelete,
    refresh: loadAdmins
  };
}
