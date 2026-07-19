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
}
