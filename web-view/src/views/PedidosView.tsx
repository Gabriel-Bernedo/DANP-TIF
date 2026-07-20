import { useState } from 'react';
import { AdminLayout } from './components/AdminLayout';
import { PedidosTable } from './components/PedidosTable';
import { usePedidosViewModel } from '../viewmodels/usePedidosViewModel';
import { useUsersViewModel } from '../viewmodels/useUsersViewModel';
import { Plus } from 'lucide-react';
import { Modal } from './components/ui/Modal';
import { PedidoForm } from './components/forms/PedidoForm';

export function PedidosView() {
  const { pedidos, isLoading, refresh, handleCreate } = usePedidosViewModel();
  const { users } = useUsersViewModel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (id: number) => {
    console.log("Ver detalles del pedido", id);
    // Aquí abriríamos un modal o navegaríamos a la vista de detalles
  };

  const onSubmit = async (data: any) => {
    await handleCreate(data);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout title="Pedidos">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Historial de Ventas</h2>
          <p className="text-sm text-gray-500">Revisa el estado y detalles de los pedidos realizados.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={refresh} className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm">
            Actualizar
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-amber-500/30 flex items-center gap-2"
          >
            <Plus size={18} />
            Crear Pedido
          </button>
        </div>
      </div>
      <PedidosTable pedidos={pedidos} isLoading={isLoading} onViewDetails={handleViewDetails} />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Crear Nuevo Pedido Base"
      >
        <PedidoForm 
          users={users}
          onSubmit={onSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </AdminLayout>
  );
}
