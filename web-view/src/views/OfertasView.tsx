import { AdminLayout } from './components/AdminLayout';
import { OfertasTable } from './components/OfertasTable';
import { useOfertasViewModel } from '../viewmodels/useOfertasViewModel';
import { Plus } from 'lucide-react';

export function OfertasView() {
  const { ofertas, isLoading, handleDelete, refresh } = useOfertasViewModel();

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
          <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-pink-500/30 flex items-center gap-2">
            <Plus size={18} />
            Crear Oferta
          </button>
        </div>
      </div>
      <OfertasTable ofertas={ofertas} isLoading={isLoading} onDelete={handleDelete} />
    </AdminLayout>
  );
}
