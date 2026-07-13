import { AdminLayout } from './components/AdminLayout';
import { AdministradoresTable } from './components/AdministradoresTable';
import { useAdminsViewModel } from '../viewmodels/useAdminsViewModel';
import { ShieldPlus } from 'lucide-react';

export function AdministradoresView() {
  const { admins, isLoading, handleDelete, refresh } = useAdminsViewModel();

  return (
    <AdminLayout title="Administradores">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Cuentas Administrativas</h2>
          <p className="text-sm text-gray-500">Gestión de personal con acceso al panel.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={refresh} className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm">
            Actualizar
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-blue-500/30 flex items-center gap-2">
            <ShieldPlus size={18} />
            Nuevo Admin
          </button>
        </div>
      </div>
      <AdministradoresTable admins={admins} isLoading={isLoading} onDelete={handleDelete} />
    </AdminLayout>
  );
}
