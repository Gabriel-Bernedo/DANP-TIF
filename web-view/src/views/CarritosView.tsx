import { AdminLayout } from './components/AdminLayout';
import { CarritosTable } from './components/CarritosTable';
import { useCarritosViewModel } from '../viewmodels/useCarritosViewModel';

export function CarritosView() {
  const { carritos, isLoading, refresh } = useCarritosViewModel();

  const handleViewDetails = (id: number) => {
    console.log("Ver detalles del carrito", id);
    // Aquí abriríamos un modal o navegaríamos a la vista de detalles
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
        </div>
      </div>
      <CarritosTable carritos={carritos} isLoading={isLoading} onViewDetails={handleViewDetails} />
    </AdminLayout>
  );
}
