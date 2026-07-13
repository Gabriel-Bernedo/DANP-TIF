import type { IAdmin } from '../models/IAdmin';

export class AdminService {
  static async getAdmins(): Promise<IAdmin[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, nombre: 'Administrador Principal', email: 'admin@admin.com', password_hash: '***', rol: 'SuperAdmin', fecha_registro: new Date().toISOString() },
          { id: 2, nombre: 'Gerente Ventas', email: 'ventas@admin.com', password_hash: '***', rol: 'SalesAdmin', fecha_registro: new Date().toISOString() },
        ]);
      }, 500);
    });
  }
}
