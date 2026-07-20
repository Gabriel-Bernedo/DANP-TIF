import { useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { CategoriasTable } from './components/CategoriasTable';
import { useCategoriasViewModel } from '../viewmodels/useCategoriasViewModel';
import { Plus } from 'lucide-react';
import { Modal } from './components/ui/Modal';
import { CategoryForm } from './components/forms/CategoryForm';

export function CategoriasView() {
  const { categorias, isLoading, handleDelete, refresh, handleCreate } = useCategoriasViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: any) => {
    await handleCreate(data);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout title="Categorías">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Clasificación de Productos</h2>
          <p className="text-sm text-gray-500">Organiza tu catálogo por categorías.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={refresh} className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm">
            Actualizar
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-teal-500/30 flex items-center gap-2"
          >
            <Plus size={18} />
            Nueva Categoría
          </button>
        </div>
      </div>
      <CategoriasTable categorias={categorias} isLoading={isLoading} onDelete={handleDelete} />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Crear Nueva Categoría"
      >
        <CategoryForm 
          onSubmit={onSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </AdminLayout>
  );
}
