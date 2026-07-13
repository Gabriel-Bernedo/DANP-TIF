export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  lastActive: string;
}

export class UserService {
  static async getActiveUsers(): Promise<UserModel[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'u1', name: 'Gabriel Bernedo', email: 'gabo@example.com', role: 'admin', lastActive: new Date().toISOString() },
          { id: 'u2', name: 'María Gómez', email: 'maria@example.com', role: 'editor', lastActive: new Date(Date.now() - 3600000).toISOString() },
          { id: 'u3', name: 'Carlos López', email: 'carlos@example.com', role: 'user', lastActive: new Date(Date.now() - 86400000).toISOString() },
        ]);
      }, 600);
    });
  }
}
