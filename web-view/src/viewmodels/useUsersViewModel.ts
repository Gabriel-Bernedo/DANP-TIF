import { useState, useEffect, useCallback } from 'react';
import { userService } from '../core/di/container';
import type { IUser } from '../models/IUser';

export function useUsersViewModel() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = async (id: number) => {
    try {
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(c => c.id !== id));
    } catch(err) {
      console.error("Error deleting:", err);
      throw err;
    }
  };

  const handleUpdate = async (id: number, data: Partial<IUser>) => {
    try {
      const updated = await userService.updateUser(id, data);
      setUsers(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    } catch (error) {
      console.error("Error updating:", error);
      throw error;
    }
  };

  
  const handleCreate = async (data: Partial<IUser>) => {
    try {
      const created = await userService.createUser(data);
      setUsers(prev => [...prev, created]);
    } catch (error) {
      console.error("Error creating:", error);
      throw error;
    }
  };

  return {
    handleCreate,
    handleUpdate,
    users,
    isLoading,
    handleDelete,
    refresh: loadUsers
  };
}
