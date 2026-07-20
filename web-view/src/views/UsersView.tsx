import { useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { UsersTable } from './components/UsersTable';
import { useUsersViewModel } from '../viewmodels/useUsersViewModel';
import { UserPlus } from 'lucide-react';
import { Modal } from './components/ui/Modal';
import { UserForm } from './components/forms/UserForm';

export function UsersView() {
  const { users, isLoading, handleDelete, refresh, handleCreate } = useUsersViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: any) => {
    await handleCreate(data);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout title="Gestión de Usuarios">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Usuarios Activos</h2>
          <p className="text-sm text-gray-500">Administra los accesos y roles de los miembros de tu equipo.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={refresh}
            className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm"
          >
            Actualizar
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-indigo-500/30 flex items-center gap-2"
          >
            <UserPlus size={18} />
            Invitar Usuario
          </button>
        </div>
      </div>

      <UsersTable 
        users={users} 
        isLoading={isLoading} 
        onDelete={handleDelete} 
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Registrar Nuevo Usuario"
      >
        <UserForm 
          onSubmit={onSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </AdminLayout>
  );
}
