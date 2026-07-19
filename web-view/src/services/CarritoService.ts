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
}
