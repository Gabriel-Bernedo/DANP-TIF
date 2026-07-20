import type { ICarrito } from '../../models/ICarrito';
import { MoreVertical, Eye, ShoppingCart } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface CarritosTableProps {
  carritos: ICarrito[];
  isLoading: boolean;
  onViewDetails: (id: number) => void;
  onEdit: (item: ICarrito) => void;
  onDelete: (id: number) => void;
}

export function CarritosTable({ carritos, isLoading, onViewDetails, onEdit, onDelete }: CarritosTableProps) {
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
            <button onClick={() => onEdit(item)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
            <button onClick={() => onDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 group-hover:hidden inline-block"><MoreVertical size={18} /></button>
        </div>
      )
    }
  ];

  return <DataTable data={carritos} columns={columns} isLoading={isLoading} keyExtractor={(item) => item.id} emptyMessage="No hay carritos activos." />;
}
