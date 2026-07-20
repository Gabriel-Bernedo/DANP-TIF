import { useState } from 'react';
import type { ICarrito } from '../models/ICarrito';
import { AdminLayout } from './components/AdminLayout';
import { CarritosTable } from './components/CarritosTable';
import { useCarritosViewModel } from '../viewmodels/useCarritosViewModel';
import { useUsersViewModel } from '../viewmodels/useUsersViewModel';
import { Plus } from 'lucide-react';
import { Modal } from './components/ui/Modal';
import { ConfirmModal } from './components/ui/ConfirmModal';
import { CarritoForm } from './components/forms/CarritoForm';

export function CarritosView() {
  const { carritos, isLoading, refresh, handleCreate, handleUpdate, handleDelete } = useCarritosViewModel();
  const { users } = useUsersViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ICarrito | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const openCreate = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const openEdit = (item: ICarrito) => {
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

  const handleViewDetails = (id: number) => {
    console.log("Ver detalles del carrito", id);
    // Aquí abriríamos un modal o navegaríamos a la vista de detalles
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
    <AdminLayout title="Carritos de Compra">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Carritos Activos</h2>
          <p className="text-sm text-gray-500">Monitorea los carritos de compra de los usuarios.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={refresh} className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm">
            Actualizar
          </button>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-emerald-500/30 flex items-center gap-2"
          >
            <Plus size={18} />
            Crear Carrito
          </button>
        </div>
      </div>
      <CarritosTable carritos={carritos} isLoading={isLoading} onViewDetails={handleViewDetails} onEdit={openEdit} onDelete={openDelete} />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={itemToEdit ? "Editar Elemento" : "Crear Nuevo Carrito"}
      >
        <CarritoForm
          users={users}
          onSubmit={onSubmit}
          onCancel={() => setIsModalOpen(false)}
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
