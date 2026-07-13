import type { IUser } from '../../models/IUser';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface UsersTableProps {
  users: IUser[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

export function UsersTable({ users, isLoading, onDelete }: UsersTableProps) {
  const columns: ColumnDef<IUser>[] = [
    {
      header: 'Nombre',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
            {item.nombre.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-gray-800">{item.nombre} {item.apellido}</span>
        </div>
      )
    },
    {
      header: 'Correo Electrónico',
      accessorKey: 'email',
      className: 'text-gray-500'
    },
    {
      header: 'Teléfono',
      accessorKey: 'telefono',
      className: 'text-gray-500'
    },
    {
      header: 'Fecha Registro',
      cell: (item) => <span className="text-gray-500">{new Date(item.fecha_registro).toLocaleString()}</span>
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
      data={users}
      columns={columns}
      isLoading={isLoading}
      keyExtractor={(item) => item.id}
      emptyMessage="No se encontraron usuarios."
    />
  );
}
