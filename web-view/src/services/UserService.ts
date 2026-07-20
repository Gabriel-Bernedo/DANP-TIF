import type { IUser } from '../models/IUser';
import type { IHttpClient } from '../core/http/IHttpClient';

export class UserService {
  private httpClient: IHttpClient;
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getUsers(): Promise<IUser[]> {
    return this.httpClient.get<IUser[]>('/usuarios');
  }

  async createUser(data: Partial<IUser>): Promise<IUser> {
    return this.httpClient.post<IUser>('/usuarios', data);
  }

  async updateUser(id: number, data: Partial<IUser>): Promise<IUser> {
    return this.httpClient.patch<IUser>(`/users/${id}`, data);
  }

  async deleteUser(id: number): Promise<void> {
    return this.httpClient.delete<void>(`/users/${id}`);
  }

}
