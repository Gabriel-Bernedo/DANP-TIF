import { useState } from 'react';
import type { IAdmin } from '../models/IAdmin';
import { AdminLayout } from './components/AdminLayout';
import { AdministradoresTable } from './components/AdministradoresTable';
import { useAdminsViewModel } from '../viewmodels/useAdminsViewModel';
import { ShieldPlus } from 'lucide-react';
import { Modal } from './components/ui/Modal';
import { ConfirmModal } from './components/ui/ConfirmModal';
import { AdminForm } from './components/forms/AdminForm';

export function AdministradoresView() {
  const { admins, isLoading, handleDelete, refresh, handleCreate, handleUpdate } = useAdminsViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<IAdmin | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const openCreate = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const openEdit = (item: IAdmin) => {
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
          <button 
            onClick={openCreate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-blue-500/30 flex items-center gap-2"
          >
            <ShieldPlus size={18} />
            Nuevo Admin
          </button>
        </div>
      </div>
      <AdministradoresTable admins={admins} isLoading={isLoading} onDelete={openDelete}
        onEdit={openEdit} />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={itemToEdit ? "Editar Elemento" : "Registrar Nuevo Administrador"}
      >
        <AdminForm 
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
