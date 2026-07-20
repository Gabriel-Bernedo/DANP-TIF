import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../core/di/container';
import type { IAdmin } from '../models/IAdmin';

export function useAdminsViewModel() {
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAdmins = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getAdmins();
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

  
  const handleCreate = async (data: Partial<IAdmin>) => {
    try {
      const created = await adminService.createAdmin(data);
      setAdmins(prev => [...prev, created]);
    } catch (error) {
      console.error("Error creating:", error);
      throw error;
    }
  };

  return {
    handleCreate,
    admins,
    isLoading,
    handleDelete,
    refresh: loadAdmins
  };
}
