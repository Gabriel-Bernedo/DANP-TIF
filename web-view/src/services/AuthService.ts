import type { IAdmin } from '../models/IAdmin';
import type { IHttpClient } from '../core/http/IHttpClient';

export class AuthService {
  private httpClient: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async login(email: string, password: string): Promise<IAdmin> {
    const response = await this.httpClient.post<{ admin: IAdmin, access_token: string }>('/auth/login', { email, password });
    if (response.access_token) {
      localStorage.setItem('token', response.access_token);
    }
    return response.admin;
  }
}

