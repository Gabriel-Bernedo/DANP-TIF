import type { IOferta } from '../models/IOferta';
import type { IHttpClient } from '../core/http/IHttpClient';

export class OfertaService {
  private httpClient: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getOfertas(): Promise<IOferta[]> {
    return this.httpClient.get<IOferta[]>('/ofertas');
  }

  async createOferta(data: Partial<IOferta>): Promise<IOferta> {
    return this.httpClient.post<IOferta>('/ofertas', data);
  }

  async updateOferta(id: number, data: Partial<IOferta>): Promise<IOferta> {
    return this.httpClient.patch<IOferta>(`/ofertas/${id}`, data);
  }

  async deleteOferta(id: number): Promise<void> {
    return this.httpClient.delete<void>(`/ofertas/${id}`);
  }

}
