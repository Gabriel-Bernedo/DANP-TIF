import { useState, useEffect, useCallback } from 'react';
import { productService } from '../core/di/container';
import type { IProduct } from '../models/IProduct';

export function useProductsViewModel() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await productService.getProducts();
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

  
  const handleCreate = async (data: Partial<IProduct>) => {
    try {
      const created = await productService.createProduct(data);
      setProducts(prev => [...prev, created]);
    } catch (error) {
      console.error("Error creating:", error);
      throw error;
    }
  };

  return {
    handleCreate,
    products,
    isLoading,
    handleDelete,
    refresh: loadProducts
  };
}
