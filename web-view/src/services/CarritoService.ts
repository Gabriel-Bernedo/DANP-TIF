import type { ICarrito } from '../models/ICarrito';
import type { IHttpClient } from '../core/http/IHttpClient';

export class CarritoService {
  private httpClient: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getCarritos(): Promise<ICarrito[]> {
    return this.httpClient.get<ICarrito[]>('/carrito');
  }

  async createCarrito(data: Partial<ICarrito>): Promise<ICarrito> {
    return this.httpClient.post<ICarrito>('/carritos', data);
  }

  async updateCarrito(id: number, data: Partial<ICarrito>): Promise<ICarrito> {
    return this.httpClient.patch<ICarrito>(`/carritos/${id}`, data);
  }

  async deleteCarrito(id: number): Promise<void> {
    return this.httpClient.delete<void>(`/carritos/${id}`);
  }

}
