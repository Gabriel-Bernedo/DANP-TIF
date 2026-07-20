import type { IAdmin } from '../models/IAdmin';
import type { IHttpClient } from '../core/http/IHttpClient';

export class AdminService {
  private httpClient: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getAdmins(): Promise<IAdmin[]> {
    return this.httpClient.get<IAdmin[]>('/administradores');
  }

  async createAdmin(data: Partial<IAdmin>): Promise<IAdmin> {
    return this.httpClient.post<IAdmin>('/administradores', data);
  }
}
