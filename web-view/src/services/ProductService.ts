import type { IProduct } from '../models/IProduct';
import type { IHttpClient } from '../core/http/IHttpClient';

export class ProductService {
  private httpClient: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getProducts(): Promise<IProduct[]> {
    return this.httpClient.get<IProduct[]>('/productos');
  }

  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    return this.httpClient.post<IProduct>('/productos', data);
  }

  async getProduct(id: number): Promise<IProduct> {
    return this.httpClient.get<IProduct>(`/productos/${id}`);
  }
  async updateProduct(id: number, data: Partial<IProduct>): Promise<IProduct> {
    return this.httpClient.patch<IProduct>(`/productos/${id}`, data);
  }

  async deleteProduct(id: number): Promise<void> {
    return this.httpClient.delete<void>(`/productos/${id}`);
  }

}
