import { AdminLayout } from './components/AdminLayout';
import { RecordsTable } from './components/RecordsTable';
import { useAdminViewModel } from '../viewmodels/useAdminViewModel';
import { Plus } from 'lucide-react';

export function AdminView() {
  const { records, isLoading, handleDelete, refresh } = useAdminViewModel();

  return (
    <AdminLayout title="Gestión de Registros">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Todos los Registros</h2>
          <p className="text-sm text-gray-500">Administra y organiza la información de tu sistema.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={refresh}
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm"
          >
            Actualizar
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-blue-500/30 flex items-center gap-2">
            <Plus size={18} />
            Nuevo Registro
          </button>
        </div>
      </div>

      <RecordsTable 
        records={records} 
        isLoading={isLoading} 
        onDelete={handleDelete} 
      />
    </AdminLayout>
  );
}
