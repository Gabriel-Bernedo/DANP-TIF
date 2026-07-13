import type { IAdmin } from '../../models/IAdmin';
import { MoreVertical, Edit2, Trash2, Shield, User } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface AdministradoresTableProps {
  admins: IAdmin[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

export function AdministradoresTable({ admins, isLoading, onDelete }: AdministradoresTableProps) {
  const getRoleBadge = (rol: string) => {
    switch (rol) {
      case 'SuperAdmin': 
        return <span className="px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-200"><Shield size={12}/> SuperAdmin</span>;
      default: 
        return <span className="px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200"><User size={12}/> Admin</span>;
    }
  };

  const columns: ColumnDef<IAdmin>[] = [
    {
      header: 'Nombre',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-300">
            {item.nombre.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-gray-800">{item.nombre}</span>
        </div>
      )
    },
    { header: 'Email', accessorKey: 'email', className: 'text-gray-500' },
    { header: 'Rol', cell: (item) => getRoleBadge(item.rol) },
    { header: 'Fecha Registro', cell: (item) => <span className="text-gray-500">{new Date(item.fecha_registro).toLocaleDateString()}</span> },
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

  return <DataTable data={admins} columns={columns} isLoading={isLoading} keyExtractor={(item) => item.id} emptyMessage="No se encontraron administradores." />;
}
