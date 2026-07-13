import { useState } from 'react';
import { AuthModel } from '../models/AuthModel';
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
      const user = await AuthModel.login(email, password);
      // Aqui normalmente guardaríamos el token o user en un contexto/store
      console.log('Logged in user:', user);
      navigate('/admin');
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
