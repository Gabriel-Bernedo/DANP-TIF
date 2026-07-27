import type { IEstadisticas } from '../models/IDashboard';
import type { IHttpClient } from '../core/http/IHttpClient';

export class DashboardService {
  private httpClient: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getEstadisticas(startDate?: string, endDate?: string): Promise<IEstadisticas> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const queryString = params.toString();
    const url = `/dashboard/estadisticas${queryString ? `?${queryString}` : ''}`;
    
    return this.httpClient.get<IEstadisticas>(url);
  }
}
