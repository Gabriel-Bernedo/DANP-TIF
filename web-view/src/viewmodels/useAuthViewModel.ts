import { useState } from 'react';
import { authService } from '../core/di/container';
import { useNavigate } from 'react-router-dom';

export function useAuthViewModel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const user = await authService.login(email, password);
      console.log('Logged in user:', user);
      navigate('/admin/productos');
    } catch (err: any) {
      setError(err.message || 'Error en inicio de sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin
  };
}
