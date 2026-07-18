import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoEstadoDto } from './dto/update-pedido-estado.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(usuarioId: number, data: CreatePedidoDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Obtener carrito activo
      const carrito = await tx.carrito.findFirst({
        where: { usuario_id: usuarioId, estado: 'activo' },
        include: {
          carrito_detalle: {
            include: {
              productos: true,
            },
          },
        },
      });

      if (!carrito || carrito.carrito_detalle.length === 0) {
        throw new BadRequestException('El carrito está vacío');
      }

      let total = 0;

      // 2. Validar stock para cada producto en el carrito
      for (const item of carrito.carrito_detalle) {
        const producto = item.productos;
        if (!producto) {
          throw new NotFoundException(
            `Producto en el detalle del carrito no encontrado`,
          );
        }

        if (producto.estado === 'retirado') {
          throw new BadRequestException(
            `El producto "${producto.nombre}" ya no está a la venta.`,
          );
        }

        if (producto.cantidad_disponible < item.cantidad) {
          throw new BadRequestException(
            `Stock insuficiente para "${producto.nombre}". Disponible: ${producto.cantidad_disponible}, solicitado: ${item.cantidad}`,
          );
        }

        const subtotal = Number(item.precio_unitario) * item.cantidad;
        total += subtotal;
      }

      // 3. Crear el Pedido
      const pedido = await tx.pedido.create({
        data: {
          usuario_id: usuarioId,
          direccion_entrega: data.direccion_entrega,
          metodo_pago: data.metodo_pago,
          fecha_entrega_estimada: data.fecha_entrega_estimada
            ? new Date(data.fecha_entrega_estimada)
            : null,
          total: total,
          estado: 'pendiente',
        },
      });

      // 4. Crear los PedidoDetalles y actualizar stock de productos
      for (const item of carrito.carrito_detalle) {
        const producto = item.productos!;
        const subtotal = Number(item.precio_unitario) * item.cantidad;

        // Crear detalle
        await tx.pedidoDetalle.create({
          data: {
            pedido_id: pedido.id,
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            precio_unitario: item.precio_unitario,
            subtotal: subtotal,
          },
        });

        // Descontar stock
        const nuevoStock = producto.cantidad_disponible - item.cantidad;
        const nuevoEstado = nuevoStock === 0 ? 'agotado' : producto.estado;

        await tx.producto.update({
          where: { id: producto.id },
          data: {
            cantidad_disponible: nuevoStock,
            estado: nuevoEstado,
          },
        });
      }

      // 5. Marcar carrito actual como procesado
      await tx.carrito.update({
        where: { id: carrito.id },
        data: { estado: 'procesado' },
      });

      return tx.pedido.findUnique({
        where: { id: pedido.id },
        include: {
          pedido_detalle: {
            include: {
              productos: true,
            },
          },
        },
      });
    });
  }

  async findMisPedidos(usuarioId: number) {
    return this.prisma.pedido.findMany({
      where: { usuario_id: usuarioId },
      include: {
        pedido_detalle: {
          include: {
            productos: true,
          },
        },
      },
      orderBy: {
        fecha_pedido: 'desc',
      },
    });
  }

  async findOne(id: number, usuarioId: number, role: string) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        pedido_detalle: {
          include: {
            productos: true,
          },
        },
        usuarios: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
          },
        },
      },
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    // Si es cliente, verificar que sea el dueño
    if (role === 'cliente' && pedido.usuario_id !== usuarioId) {
      throw new BadRequestException('No tienes permiso para ver este pedido');
    }

    return pedido;
  }

  async findAll() {
    return this.prisma.pedido.findMany({
      include: {
        pedido_detalle: {
          include: {
            productos: true,
          },
        },
        usuarios: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
          },
        },
      },
      orderBy: {
        fecha_pedido: 'desc',
      },
    });
  }

  async updateEstado(id: number, data: UpdatePedidoEstadoDto) {
    const pedido = await this.prisma.pedido.findUnique({ where: { id } });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return this.prisma.pedido.update({
      where: { id },
      data: { estado: data.estado },
      include: {
        pedido_detalle: {
          include: {
            productos: true,
          },
        },
      },
    });
  }
}
