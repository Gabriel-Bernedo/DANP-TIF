import type { IPedido } from '../../models/IPedido';
import { MoreVertical, Eye, Truck, CreditCard } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface PedidosTableProps {
  pedidos: IPedido[];
  isLoading: boolean;
  onViewDetails: (id: number) => void;
  onEdit: (item: IPedido) => void;
  onDelete: (id: number) => void;
}

export function PedidosTable({ pedidos, isLoading, onViewDetails, onEdit, onDelete }: PedidosTableProps) {
  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'Completado': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">Completado</span>;
      case 'Procesando': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">Procesando</span>;
      case 'Cancelado': return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Cancelado</span>;
      default: return <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{estado}</span>;
    }
  };

  const columns: ColumnDef<IPedido>[] = [
    {
      header: 'Pedido ID',
      cell: (item) => <span className="font-bold text-gray-800">ORD-{item.id.toString().padStart(4, '0')}</span>
    },
    { header: 'Cliente (ID)', accessorKey: 'usuario_id', className: 'text-gray-500 font-medium' },
    { header: 'Fecha', cell: (item) => <span className="text-gray-600">{new Date(item.fecha_pedido).toLocaleDateString()}</span> },
    { 
      header: 'Método Pago', 
      cell: (item) => (
        <div className="flex items-center gap-1 text-gray-600">
          <CreditCard size={14} /> <span className="text-sm">{item.metodo_pago}</span>
        </div>
      )
    },
    { header: 'Estado', cell: (item) => getStatusBadge(item.estado) },
    { header: 'Total', cell: (item) => <span className="font-bold text-gray-800">${Number(item.total).toFixed(2)}</span> },
    {
      header: 'Acciones',
      className: 'text-right',
      cell: (item) => (
        <div className="flex items-center justify-end gap-2 group">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Actualizar Envío"><Truck size={18} /></button>
            <button onClick={() => onViewDetails(item.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver Detalles"><Eye size={18} /></button>
            <button onClick={() => onEdit(item)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Editar"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
            <button onClick={() => onDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 group-hover:hidden inline-block"><MoreVertical size={18} /></button>
        </div>
      )
    }
  ];

  return <DataTable data={pedidos} columns={columns} isLoading={isLoading} keyExtractor={(item) => item.id} emptyMessage="No hay pedidos registrados." />;
}
