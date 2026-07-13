import { useState, useEffect, useCallback } from 'react';
import { UserService } from '../services/UserService';
import type { IUser } from '../models/IUser';

export function useUsersViewModel() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await UserService.getUsers();
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

  return {
    users,
    isLoading,
    handleDelete,
    refresh: loadUsers
  };
}
