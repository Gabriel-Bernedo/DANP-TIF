import type { IPedido } from '../models/IPedido';
import type { IHttpClient } from '../core/http/IHttpClient';

export class PedidoService {
  private httpClient: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getPedidos(): Promise<IPedido[]> {
    return this.httpClient.get<IPedido[]>('/pedidos');
  }

  async createPedido(data: Partial<IPedido>): Promise<IPedido> {
    return this.httpClient.post<IPedido>('/pedidos', data);
  }

  async updatePedido(id: number, data: Partial<IPedido>): Promise<IPedido> {
    return this.httpClient.patch<IPedido>(`/pedidos/${id}`, data);
  }

  async deletePedido(id: number): Promise<void> {
    return this.httpClient.delete<void>(`/pedidos/${id}`);
  }

}
