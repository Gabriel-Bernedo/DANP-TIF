import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getEstadisticas(startDate?: string, endDate?: string) {
    const whereClause: any = {};
    if (startDate || endDate) {
      whereClause.fecha_pedido = {};
      if (startDate) {
        whereClause.fecha_pedido.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.fecha_pedido.lte = new Date(endDate);
      }
    }

    // 1. Total de pedidos
    const totalPedidos = await this.prisma.pedido.count({
      where: whereClause,
    });

    // 2. Ingresos Totales
    const pedidos = await this.prisma.pedido.findMany({
      where: whereClause,
      select: {
        total: true,
        fecha_pedido: true,
      },
    });

    const ingresosTotales = pedidos.reduce(
      (sum, p) => sum + Number(p.total),
      0,
    );

    // 3. Ventas Temporales (Agrupado por día)
    // Para simplificar, agrupamos en memoria ya que los datos están filtrados.
    const ventasTemporalesMap = new Map<string, number>();
    pedidos.forEach((p) => {
      if (!p.fecha_pedido) return;
      // Formato YYYY-MM-DD
      const dateKey = p.fecha_pedido.toISOString().split('T')[0];
      const currentTotal = ventasTemporalesMap.get(dateKey) || 0;
      ventasTemporalesMap.set(dateKey, currentTotal + Number(p.total));
    });

    const ventasTemporales = Array.from(ventasTemporalesMap.entries())
      .map(([fecha, total]) => ({ fecha, total }))
      .sort((a, b) => a.fecha.localeCompare(b.fecha)); // Orden cronológico

    // 4. Productos más vendidos
    // Filtramos los detalles de pedido que correspondan a los pedidos en el rango de fechas
    let orderDetailWhere = {};
    if (startDate || endDate) {
      orderDetailWhere = {
        pedidos: {
          fecha_pedido: whereClause.fecha_pedido,
        },
      };
    }

    const productosAgrupados = await this.prisma.pedidoDetalle.groupBy({
      by: ['producto_id'],
      _sum: {
        cantidad: true,
      },
      where: orderDetailWhere,
      orderBy: {
        _sum: {
          cantidad: 'desc',
        },
      },
      take: 5, // Top 5
    });

    // Obtener nombres de los productos más vendidos
    const productosMasVendidos = await Promise.all(
      productosAgrupados.map(async (p) => {
        const producto = await this.prisma.producto.findUnique({
          where: { id: p.producto_id! },
          select: { nombre: true },
        });
        return {
          producto_id: p.producto_id,
          nombre: producto?.nombre || 'Producto Desconocido',
          cantidad_vendida: p._sum.cantidad || 0,
        };
      }),
    );

    return {
      ingresosTotales,
      totalPedidos,
      ventasTemporales,
      productosMasVendidos,
    };
  }
}
