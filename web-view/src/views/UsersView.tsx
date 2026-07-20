import { useState } from 'react';
import type { IUser } from '../models/IUser';
import { AdminLayout } from './components/AdminLayout';
import { UsersTable } from './components/UsersTable';
import { useUsersViewModel } from '../viewmodels/useUsersViewModel';
import { UserPlus } from 'lucide-react';
import { Modal } from './components/ui/Modal';
import { ConfirmModal } from './components/ui/ConfirmModal';
import { UserForm } from './components/forms/UserForm';

export function UsersView() {
  const { users, isLoading, handleDelete, refresh, handleCreate, handleUpdate } = useUsersViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<IUser | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const openCreate = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const openEdit = (item: IUser) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  const openDelete = (id: number) => {
    setItemToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete !== null) {
      await handleDelete(itemToDelete);
      setIsConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const onSubmit = async (data: any) => {
    if (itemToEdit) {
      await handleUpdate(itemToEdit.id, data);
    } else {
      await handleCreate(data);
    }
    setIsModalOpen(false);
    setItemToEdit(null);
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
            onClick={openCreate}
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
        onDelete={openDelete}
        onEdit={openEdit} 
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={itemToEdit ? "Editar Elemento" : "Registrar Nuevo Usuario"}
      >
        <UserForm 
          onSubmit={onSubmit} 
          onCancel={() => setIsModalOpen(false)} 
          initialData={itemToEdit || undefined}
        />
      </Modal>
    
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer."
      />
    </AdminLayout>
  );
}
