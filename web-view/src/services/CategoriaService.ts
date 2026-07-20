import type { ICategoria } from '../models/ICategoria';
import type { IHttpClient } from '../core/http/IHttpClient';

export class CategoriaService {
  private httpClient: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getCategorias(): Promise<ICategoria[]> {
    return this.httpClient.get<ICategoria[]>('/categorias');
  }

  async createCategoria(data: Partial<ICategoria>): Promise<ICategoria> {
    return this.httpClient.post<ICategoria>('/categorias', data);
  }
}
