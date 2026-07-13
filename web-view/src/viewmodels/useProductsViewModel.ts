import { useState, useEffect, useCallback } from 'react';
import { ProductService } from '../services/ProductService';
import type { IProduct } from '../models/IProduct';

export function useProductsViewModel() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return {
    products,
    isLoading,
    handleDelete,
    refresh: loadProducts
  };
}
