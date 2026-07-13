import type { IPedido } from '../../models/IPedido';
import { MoreVertical, Eye, Truck, CreditCard } from 'lucide-react';
import { DataTable, type ColumnDef } from './ui/DataTable';

interface PedidosTableProps {
  pedidos: IPedido[];
  isLoading: boolean;
  onViewDetails: (id: number) => void;
}

export function PedidosTable({ pedidos, isLoading, onViewDetails }: PedidosTableProps) {
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
    { header: 'Total', cell: (item) => <span className="font-bold text-gray-800">${item.total.toFixed(2)}</span> },
    {
      header: 'Acciones',
      className: 'text-right',
      cell: (item) => (
        <div className="flex items-center justify-end gap-2 group">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Actualizar Envío"><Truck size={18} /></button>
            <button onClick={() => onViewDetails(item.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver Detalles"><Eye size={18} /></button>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 group-hover:hidden inline-block"><MoreVertical size={18} /></button>
        </div>
      )
    }
  ];

  return <DataTable data={pedidos} columns={columns} isLoading={isLoading} keyExtractor={(item) => item.id} emptyMessage="No hay pedidos registrados." />;
}
