import type { UserModel } from '../../models/UserModel';
import { MoreVertical, Edit2, Trash2, Shield, User } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface UsersTableProps {
  users: UserModel[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function UsersTable({ users, isLoading, onDelete }: UsersTableProps) {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': 
        return <span className="px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-200"><Shield size={12}/> Admin</span>;
      case 'editor': 
        return <span className="px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200"><User size={12}/> Editor</span>;
      default: 
        return <span className="px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-200"><User size={12}/> Usuario</span>;
    }
  };

  const columns: ColumnDef<UserModel>[] = [
    {
      header: 'Nombre',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
            {item.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-gray-800">{item.name}</span>
        </div>
      )
    },
    {
      header: 'Correo Electrónico',
      accessorKey: 'email',
      className: 'text-gray-500'
    },
    {
      header: 'Rol',
      cell: (item) => getRoleBadge(item.role)
    },
    {
      header: 'Última Actividad',
      cell: (item) => <span className="text-gray-500">{new Date(item.lastActive).toLocaleString()}</span>
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
