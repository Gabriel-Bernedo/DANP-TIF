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

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
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
    users,
    isLoading,
    handleDelete,
    refresh: loadUsers
  };
}
