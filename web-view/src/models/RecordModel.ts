export interface RecordItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

export class RecordModel {
  static async getRecords(): Promise<RecordItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', title: 'Registro Alfa', description: 'Primer objeto del sistema', status: 'active', createdAt: new Date().toISOString() },
          { id: '2', title: 'Registro Beta', description: 'Objeto secundario', status: 'pending', createdAt: new Date().toISOString() },
          { id: '3', title: 'Registro Gamma', description: 'Objeto archivado', status: 'inactive', createdAt: new Date().toISOString() },
        ]);
      }, 800);
    });
  }
}
