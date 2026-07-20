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

  const handleDelete = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(c => c.id !== id));
    } catch(err) {
      console.error("Error deleting:", err);
      throw err;
    }
  };

  const handleUpdate = async (id: number, data: Partial<IProduct>) => {
    try {
      await productService.updateProduct(id, data);
      setProducts(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    } catch (error) {
      console.error("Error updating:", error);
      throw error;
    }
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
    handleUpdate,
    products,
    isLoading,
    handleDelete,
    refresh: loadProducts
  };
}
