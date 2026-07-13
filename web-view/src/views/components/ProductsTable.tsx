import type { ProductModel } from '../../models/ProductModel';
import { MoreVertical, Edit2, Trash2, Package } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface ProductsTableProps {
  products: ProductModel[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function ProductsTable({ products, isLoading, onDelete }: ProductsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'low_stock': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'out_of_stock': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_stock': return 'En Stock';
      case 'low_stock': return 'Stock Bajo';
      case 'out_of_stock': return 'Agotado';
      default: return status;
    }
  };

  const columns: ColumnDef<ProductModel>[] = [
    {
      header: 'Producto',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center border border-gray-200">
            <Package size={20} />
          </div>
          <div>
            <div className="font-semibold text-gray-800">{item.name}</div>
            <div className="text-xs text-gray-500">{item.category}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Precio',
      cell: (item) => <span className="font-medium text-gray-700">${item.price.toFixed(2)}</span>
    },
    {
      header: 'Stock',
      accessorKey: 'stock',
      className: 'font-medium'
    },
    {
      header: 'Estado',
      cell: (item) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(item.status)}`}>
          {getStatusLabel(item.status)}
        </span>
      )
    },
    {
      header: 'Acciones',
      className: 'text-right',
      cell: (item) => (
        <div className="flex items-center justify-end gap-2 group">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Editar">
              <Edit2 size={18} />
            </button>
            <button 
              onClick={() => onDelete(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
              title="Eliminar"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 group-hover:hidden inline-block">
            <MoreVertical size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      isLoading={isLoading}
      keyExtractor={(item) => item.id}
      emptyMessage="No hay productos disponibles."
    />
  );
}
