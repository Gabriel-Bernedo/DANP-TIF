import type { ICarrito } from '../../models/ICarrito';
import { MoreVertical, Eye, ShoppingCart } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface CarritosTableProps {
  carritos: ICarrito[];
  isLoading: boolean;
  onViewDetails: (id: number) => void;
}

export function CarritosTable({ carritos, isLoading, onViewDetails }: CarritosTableProps) {
  const columns: ColumnDef<ICarrito>[] = [
    {
      header: 'Carrito ID',
      cell: (item) => (
        <div className="flex items-center gap-2">
          <ShoppingCart size={16} className="text-gray-400" />
          <span className="font-medium text-gray-700">#{item.id}</span>
        </div>
      )
    },
    { header: 'Usuario ID', accessorKey: 'usuario_id', className: 'text-gray-500 font-medium' },
    { header: 'Fecha Creación', cell: (item) => <span className="text-gray-500">{new Date(item.fecha_creacion).toLocaleString()}</span> },
    { 
      header: 'Estado', 
      cell: (item) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-md ${item.estado === 'Activo' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'}`}>
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
            <button onClick={() => onViewDetails(item.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver Detalles"><Eye size={18} /></button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 group-hover:hidden inline-block"><MoreVertical size={18} /></button>
        </div>
      )
    }
  ];

  return <DataTable data={carritos} columns={columns} isLoading={isLoading} keyExtractor={(item) => item.id} emptyMessage="No hay carritos activos." />;
}
