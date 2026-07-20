import { useState } from 'react';
import type { IOferta } from '../models/IOferta';
import { AdminLayout } from './components/AdminLayout';
import { OfertasTable } from './components/OfertasTable';
import { useOfertasViewModel } from '../viewmodels/useOfertasViewModel';
import { useProductsViewModel } from '../viewmodels/useProductsViewModel';
import { Plus } from 'lucide-react';
import { Modal } from './components/ui/Modal';
import { ConfirmModal } from './components/ui/ConfirmModal';
import { OfferForm } from './components/forms/OfferForm';

export function OfertasView() {
  const { ofertas, isLoading, handleDelete, refresh, handleCreate, handleUpdate } = useOfertasViewModel();
  const { products } = useProductsViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<IOferta | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const openCreate = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const openEdit = (item: IOferta) => {
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
    <AdminLayout title="Ofertas Especiales">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Promociones Activas</h2>
          <p className="text-sm text-gray-500">Gestiona los descuentos aplicables a productos.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={refresh} className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm">
            Actualizar
          </button>
          <button 
            onClick={openCreate}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-pink-500/30 flex items-center gap-2"
          >
            <Plus size={18} />
            Crear Oferta
          </button>
        </div>
      </div>
      <OfertasTable ofertas={ofertas} isLoading={isLoading} onDelete={openDelete}
        onEdit={openEdit} />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={itemToEdit ? "Editar Elemento" : "Crear Nueva Oferta"}
      >
        <OfferForm 
          products={products}
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
