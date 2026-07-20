import { useState } from 'react';
import type { IProduct } from '../models/IProduct';
import { AdminLayout } from './components/AdminLayout';
import { ProductsTable } from './components/ProductsTable';
import { useProductsViewModel } from '../viewmodels/useProductsViewModel';
import { useCategoriasViewModel } from '../viewmodels/useCategoriasViewModel';
import { Plus } from 'lucide-react';
import { Modal } from './components/ui/Modal';
import { ConfirmModal } from './components/ui/ConfirmModal';
import { ProductForm } from './components/forms/ProductForm';

export function ProductsView() {
  const { products, isLoading, handleDelete, refresh, handleCreate, handleUpdate } = useProductsViewModel();
  const { categorias } = useCategoriasViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<IProduct | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const openCreate = () => {
    setItemToEdit(null);
    setIsModalOpen(true);
  };

  const openEdit = (item: IProduct) => {
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
    <AdminLayout title="Catálogo de Productos">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Inventario</h2>
          <p className="text-sm text-gray-500">Controla tu stock, precios y categorías de productos.</p>
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
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-emerald-500/30 flex items-center gap-2"
          >
            <Plus size={18} />
            Añadir Producto
          </button>
        </div>
      </div>

      <ProductsTable 
        products={products} 
        isLoading={isLoading} 
        onDelete={openDelete}
        onEdit={openEdit} 
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={itemToEdit ? "Editar Elemento" : "Crear Nuevo Producto"}
      >
        <ProductForm 
          categories={categorias} 
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
