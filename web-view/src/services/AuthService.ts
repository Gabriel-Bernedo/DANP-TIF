import type { IAdmin } from '../models/IAdmin';

export class AuthService {
  static async login(email: string, password: string): Promise<IAdmin> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@admin.com' && password === 'admin') {
          resolve({ 
            id: 1, 
            nombre: 'Administrador Principal', 
            email, 
            password_hash: '***',
            rol: 'SuperAdmin',
            fecha_registro: new Date().toISOString()
          });
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1000);
    });
  }
}
