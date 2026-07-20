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

  const handleDelete = async (id: number) => {
    try {
      await adminService.deleteAdmin(id);
      setAdmins(prev => prev.filter(c => c.id !== id));
    } catch(err) {
      console.error("Error deleting:", err);
      throw err;
    }
  };

  const handleUpdate = async (id: number, data: Partial<IAdmin>) => {
    try {
      await adminService.updateAdmin(id, data);
      setAdmins(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    } catch (error) {
      console.error("Error updating:", error);
      throw error;
    }
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
    handleUpdate,
    admins,
    isLoading,
    handleDelete,
    refresh: loadAdmins
  };
}
