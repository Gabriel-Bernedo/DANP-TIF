import { AdminLayout } from './components/AdminLayout';
import { PedidosTable } from './components/PedidosTable';
import { usePedidosViewModel } from '../viewmodels/usePedidosViewModel';

export function PedidosView() {
  const { pedidos, isLoading, refresh } = usePedidosViewModel();

  const handleViewDetails = (id: number) => {
    console.log("Ver detalles del pedido", id);
    // Aquí abriríamos un modal o navegaríamos a la vista de detalles
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
        </div>
      </div>
      <PedidosTable pedidos={pedidos} isLoading={isLoading} onViewDetails={handleViewDetails} />
    </AdminLayout>
  );
}
