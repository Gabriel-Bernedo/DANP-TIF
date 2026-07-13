export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export class AuthModel {
  static async login(email: string, password: string):Promise<User> {
    // Simulamos un delay de red
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@admin.com' && password === 'admin') {
          resolve({ id: '1', name: 'Administrador', email, role: 'admin' });
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1000);
    });
  }

  static logout(): void {
    // Limpieza de tokens simulada
  }
}
