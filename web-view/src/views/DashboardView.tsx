import { useDashboardViewModel } from '../viewmodels/useDashboardViewModel';
import { AdminLayout } from './components/AdminLayout';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Download, TrendingUp, ShoppingBag, Calendar, Package, Activity, DollarSign } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function DashboardView() {
  const { 
    estadisticas, 
    isLoading, 
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate, 
    refresh 
  } = useDashboardViewModel();

  const handleDownloadPDF = () => {
    if (!estadisticas) return;
    
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Reporte de Dashboard', 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Ingresos Totales: $${(estadisticas.ingresosTotales || 0).toFixed(2)}`, 14, 32);
    doc.text(`Total Pedidos: ${estadisticas.totalPedidos || 0}`, 14, 38);
    doc.text(`Venta Promedio por Pedido: $${(estadisticas.ventaPromedioPedido || 0).toFixed(2)}`, 14, 44);
    doc.text(`Tamaño Prom. de Pedido: ${(estadisticas.tamanoPromedioPedido || 0).toFixed(2)} items`, 14, 50);
    doc.text(`Pedidos por Día (Promedio): ${(estadisticas.numeroPedidosPromedio || 0).toFixed(2)}`, 14, 56);
    
    let currentY = 62;
    if (startDate || endDate) {
        doc.text(`Filtro: ${startDate || 'Inicio'} hasta ${endDate || 'Fin'}`, 14, currentY);
        currentY += 6;
    }

    doc.setFontSize(16);
    doc.text('Ventas Temporales', 14, currentY + 10);
    autoTable(doc, {
      startY: currentY + 15,
      head: [['Fecha', 'Total ($)']],
      body: (estadisticas.ventasTemporales || []).map(v => [v.fecha, (v.total || 0).toFixed(2)]),
    });

    const finalY = (doc as any).lastAutoTable.finalY || 60;
    
    doc.setFontSize(16);
    doc.text('Productos Más Vendidos', 14, finalY + 15);
    autoTable(doc, {
      startY: finalY + 20,
      head: [['ID Producto', 'Nombre', 'Cantidad Vendida']],
      body: (estadisticas.productosMasVendidos || []).map(p => [p.producto_id, p.nombre, p.cantidad_vendida]),
    });

    const finalY2 = (doc as any).lastAutoTable.finalY || finalY + 20;

    doc.setFontSize(16);
    doc.text('Productos Menos Vendidos', 14, finalY2 + 15);
    autoTable(doc, {
      startY: finalY2 + 20,
      head: [['ID Producto', 'Nombre', 'Cantidad Vendida']],
      body: (estadisticas.productosMenosVendidos || []).map(p => [p.producto_id, p.nombre, p.cantidad_vendida]),
    });

    const finalY3 = (doc as any).lastAutoTable.finalY || finalY2 + 20;

    doc.setFontSize(16);
    doc.text('Ventas por Categoría', 14, finalY3 + 15);
    autoTable(doc, {
      startY: finalY3 + 20,
      head: [['Categoría', 'Cantidad Vendida']],
      body: (estadisticas.ventasPorCategoria || []).map(c => [c.nombre, c.cantidad]),
    });

    doc.save('reporte_dashboard.pdf');
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#f43f5e', '#a855f7'];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        
        {/* Filtros y Acciones */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <span className="text-sm font-medium">Filtro por fecha:</span>
            </div>
            <input 
              type="date" 
              value={startDate} 
              onChange={e => setStartDate(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={e => setEndDate(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button 
              onClick={() => refresh()}
              className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
            >
              Aplicar
            </button>
          </div>
          <button 
            onClick={handleDownloadPDF}
            disabled={!estadisticas}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <Download size={18} />
            Exportar PDF
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : estadisticas ? (
          <>
            {/* Tarjetas de Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <TrendingUp size={20} />
                  </div>
                  <p className="text-sm font-medium text-gray-500 leading-tight">Ingresos<br/>Totales</p>
                </div>
                <p className="text-xl font-bold text-gray-900">${(estadisticas.ingresosTotales || 0).toFixed(2)}</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <ShoppingBag size={20} />
                  </div>
                  <p className="text-sm font-medium text-gray-500 leading-tight">Total<br/>Pedidos</p>
                </div>
                <p className="text-xl font-bold text-gray-900">{estadisticas.totalPedidos || 0}</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                    <DollarSign size={20} />
                  </div>
                  <p className="text-sm font-medium text-gray-500 leading-tight">Venta Prom.<br/>(por Pedido)</p>
                </div>
                <p className="text-xl font-bold text-gray-900">${(estadisticas.ventaPromedioPedido || 0).toFixed(2)}</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                    <Package size={20} />
                  </div>
                  <p className="text-sm font-medium text-gray-500 leading-tight">Tamaño Prom.<br/>(Items)</p>
                </div>
                <p className="text-xl font-bold text-gray-900">{(estadisticas.tamanoPromedioPedido || 0).toFixed(1)}</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                    <Activity size={20} />
                  </div>
                  <p className="text-sm font-medium text-gray-500 leading-tight">Pedidos / Día<br/>(Promedio)</p>
                </div>
                <p className="text-xl font-bold text-gray-900">{(estadisticas.numeroPedidosPromedio || 0).toFixed(1)}</p>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Ventas Temporales */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Ventas en el Tiempo</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={estadisticas.ventasTemporales} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Ventas']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gráfico de Productos Más Vendidos */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Top Productos Más Vendidos</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={estadisticas.productosMasVendidos} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                      <YAxis dataKey="nombre" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} width={120} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any) => [value, 'Cantidad']}
                        cursor={{fill: '#f3f4f6'}}
                      />
                      <Bar dataKey="cantidad_vendida" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Gráfico de Ventas por Categoría */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Distribución por Categorías</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={estadisticas.ventasPorCategoria}
                        dataKey="cantidad"
                        nameKey="nombre"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={(props: any) => `${props.nombre} ${((props.percent || 0) * 100).toFixed(0)}%`}
                      >
                        {(estadisticas.ventasPorCategoria || []).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any) => [value, 'Cantidad']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gráfico de Productos Menos Vendidos */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Top Productos Menos Vendidos</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={estadisticas.productosMenosVendidos} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                      <YAxis dataKey="nombre" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} width={120} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any) => [value, 'Cantidad']}
                        cursor={{fill: '#f3f4f6'}}
                      />
                      <Bar dataKey="cantidad_vendida" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No se pudieron cargar las estadísticas.
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
