import type { IUser } from '../models/IUser';

export class UserService {
  static async getUsers(): Promise<IUser[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, nombre: 'Gabriel', apellido: 'Bernedo', email: 'gabo@example.com', password_hash: '***', telefono: '555-0100', direccion: 'Calle Falsa 123', fecha_registro: new Date().toISOString(), estado: 'Activo' },
          { id: 2, nombre: 'María', apellido: 'Gómez', email: 'maria@example.com', password_hash: '***', telefono: '555-0101', direccion: 'Avenida Siempre Viva 742', fecha_registro: new Date(Date.now() - 3600000).toISOString(), estado: 'Activo' },
          { id: 3, nombre: 'Carlos', apellido: 'López', email: 'carlos@example.com', password_hash: '***', telefono: '555-0102', direccion: 'Boulevard de los Sueños Rotos', fecha_registro: new Date(Date.now() - 86400000).toISOString(), estado: 'Inactivo' },
        ]);
      }, 600);
    });
  }
}
