import type { IProduct } from '../../models/IProduct';
import { MoreVertical, Edit2, Trash2, Package } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface ProductsTableProps {
  products: IProduct[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

export function ProductsTable({ products, isLoading, onDelete }: ProductsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Stock Bajo': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Agotado': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      header: 'Producto',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center border border-gray-200">
            <Package size={20} />
          </div>
          <div>
            <div className="font-semibold text-gray-800">{item.nombre}</div>
            <div className="text-xs text-gray-500">Categoría #{item.categoria_id}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Precio',
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">
            ${item.precio_descuento != null ? Number(item.precio_descuento).toFixed(2) : Number(item.precio_original).toFixed(2)}
          </span>
          {item.precio_descuento != null && (
            <span className="text-xs text-gray-400 line-through">${Number(item.precio_original).toFixed(2)}</span>
          )}
        </div>
      )
    },
    {
      header: 'Stock',
      accessorKey: 'cantidad_disponible',
      className: 'font-medium'
    },
    {
      header: 'Estado',
      cell: (item) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(item.estado)}`}>
          {item.estado}
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
