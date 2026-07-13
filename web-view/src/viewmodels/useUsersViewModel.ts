import { useState, useEffect, useCallback } from 'react';
import { UserService, type UserModel } from '../models/UserModel';

export function useUsersViewModel() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await UserService.getActiveUsers();
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

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return {
    users,
    isLoading,
    handleDelete,
    refresh: loadUsers
  };
}
