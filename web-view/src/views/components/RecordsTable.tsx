import type { RecordItem } from '../../models/RecordModel';
import { MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface RecordsTableProps {
  records: RecordItem[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function RecordsTable({ records, isLoading, onDelete }: RecordsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'pending': return 'Pendiente';
      case 'inactive': return 'Inactivo';
      default: return status;
    }
  };

  const columns: ColumnDef<RecordItem>[] = [
    {
      header: 'ID',
      cell: (item) => <span className="font-medium text-gray-900">#{item.id}</span>
    },
    {
      header: 'Título',
      cell: (item) => <span className="font-semibold text-gray-800">{item.title}</span>
    },
    {
      header: 'Descripción',
      cell: (item) => <span className="text-gray-500 max-w-xs truncate block">{item.description}</span>
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
      header: 'Fecha',
      cell: (item) => <span className="text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
    },
    {
      header: 'Acciones',
      className: 'text-right',
      cell: (item) => (
        <div className="flex items-center justify-end gap-2 group">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver">
              <Eye size={18} />
            </button>
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
      data={records}
      columns={columns}
      isLoading={isLoading}
      keyExtractor={(item) => item.id}
      emptyMessage="No se encontraron registros."
    />
  );
}
