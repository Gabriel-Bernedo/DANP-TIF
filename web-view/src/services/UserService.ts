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
}
