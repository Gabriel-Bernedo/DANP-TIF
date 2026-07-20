import type { IOferta } from '../../models/IOferta';
import { MoreVertical, Edit2, Trash2, Percent } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface OfertasTableProps {
  ofertas: IOferta[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onEdit?: (item: IOferta) => void;
}

export function OfertasTable({ ofertas, isLoading, onDelete, onEdit }: OfertasTableProps) {
  const getStatusBadge = (estado: string) => {
    if(estado === 'Activa') return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Activa</span>;
    if(estado === 'Programada') return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">Programada</span>;
    return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{estado}</span>;
  }

  const columns: ColumnDef<IOferta>[] = [
    {
      header: 'Producto ID',
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Percent size={16} className="text-pink-500" />
          <span className="font-semibold text-gray-800">#{item.producto_id}</span>
        </div>
      )
    },
    { header: 'Descuento', cell: (item) => <span className="font-bold text-pink-600">{item.porcentaje_descuento}%</span> },
    { header: 'Inicio', cell: (item) => <span className="text-gray-500">{new Date(item.fecha_inicio).toLocaleDateString()}</span> },
    { header: 'Fin', cell: (item) => <span className="text-gray-500">{new Date(item.fecha_fin).toLocaleDateString()}</span> },
    { header: 'Estado', cell: (item) => getStatusBadge(item.estado) },
    {
      header: 'Acciones',
      className: 'text-right',
      cell: (item) => (
        <div className="flex items-center justify-end gap-2 group">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit?.(item)}  className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Editar"><Edit2 size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar"><Trash2 size={18} /></button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 group-hover:hidden inline-block"><MoreVertical size={18} /></button>
        </div>
      )
    }
  ];

  return <DataTable data={ofertas} columns={columns} isLoading={isLoading} keyExtractor={(item) => item.id} emptyMessage="No hay ofertas registradas." />;
}
