import { AdminLayout } from './components/AdminLayout';
import { ProductsTable } from './components/ProductsTable';
import { useProductsViewModel } from '../viewmodels/useProductsViewModel';
import { Plus } from 'lucide-react';

export function ProductsView() {
  const { products, isLoading, handleDelete, refresh } = useProductsViewModel();

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
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-emerald-500/30 flex items-center gap-2">
            <Plus size={18} />
            Añadir Producto
          </button>
        </div>
      </div>

      <ProductsTable 
        products={products} 
        isLoading={isLoading} 
        onDelete={handleDelete} 
      />
    </AdminLayout>
  );
}
