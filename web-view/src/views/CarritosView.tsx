import { useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { CarritosTable } from './components/CarritosTable';
import { useCarritosViewModel } from '../viewmodels/useCarritosViewModel';
import { useUsersViewModel } from '../viewmodels/useUsersViewModel';
import { Plus } from 'lucide-react';
import { Modal } from './components/ui/Modal';
import { CarritoForm } from './components/forms/CarritoForm';

export function CarritosView() {
  const { carritos, isLoading, refresh, handleCreate } = useCarritosViewModel();
  const { users } = useUsersViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (id: number) => {
    console.log("Ver detalles del carrito", id);
    // Aquí abriríamos un modal o navegaríamos a la vista de detalles
  };

  const onSubmit = async (data: any) => {
    await handleCreate(data);
    setIsModalOpen(false);
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
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-emerald-500/30 flex items-center gap-2"
          >
            <Plus size={18} />
            Crear Carrito
          </button>
        </div>
      </div>
      <CarritosTable carritos={carritos} isLoading={isLoading} onViewDetails={handleViewDetails} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nuevo Carrito"
      >
        <CarritoForm
          users={users}
          onSubmit={onSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  );
}
