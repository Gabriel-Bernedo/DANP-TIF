export interface ProductModel {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export class ProductService {
  static async getProducts(): Promise<ProductModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'p1', name: 'Laptop Pro X', category: 'Electrónica', price: 1299.99, stock: 45, status: 'in_stock' },
          { id: 'p2', name: 'Silla Ergonómica V2', category: 'Oficina', price: 249.50, stock: 5, status: 'low_stock' },
          { id: 'p3', name: 'Auriculares Inalámbricos', category: 'Accesorios', price: 89.99, stock: 0, status: 'out_of_stock' },
          { id: 'p4', name: 'Monitor 4K Ultra', category: 'Electrónica', price: 399.00, stock: 12, status: 'in_stock' },
        ]);
      }, 700);
    });
  }
}
