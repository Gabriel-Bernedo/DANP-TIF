import type { ICategoria } from '../../models/ICategoria';
import { MoreVertical, Edit2, Trash2, Tag } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface CategoriasTableProps {
  categorias: ICategoria[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

export function CategoriasTable({ categorias, isLoading, onDelete }: CategoriasTableProps) {
  const columns: ColumnDef<ICategoria>[] = [
    {
      header: 'Nombre',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
            <Tag size={16} />
          </div>
          <span className="font-semibold text-gray-800">{item.nombre}</span>
        </div>
      )
    },
    { header: 'Descripción', accessorKey: 'descripcion', className: 'text-gray-500 max-w-md truncate' },
    {
      header: 'Acciones',
      className: 'text-right',
      cell: (item) => (
        <div className="flex items-center justify-end gap-2 group">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Editar"><Edit2 size={18} /></button>
            <button onClick={() => onDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar"><Trash2 size={18} /></button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 group-hover:hidden inline-block"><MoreVertical size={18} /></button>
        </div>
      )
    }
  ];

  return <DataTable data={categorias} columns={columns} isLoading={isLoading} keyExtractor={(item) => item.id} emptyMessage="No se encontraron categorías." />;
}
