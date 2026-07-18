import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class CarritoService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateActiveCart(usuarioId: number) {
    let carrito = await this.prisma.carrito.findFirst({
      where: { usuario_id: usuarioId, estado: 'activo' },
      include: {
        carrito_detalle: {
          include: {
            productos: true,
          },
        },
      },
    });

    if (!carrito) {
      carrito = await this.prisma.carrito.create({
        data: {
          usuario_id: usuarioId,
          estado: 'activo',
        },
        include: {
          carrito_detalle: {
            include: {
              productos: true,
            },
          },
        },
      });
    }

    return carrito;
  }

  async addItem(usuarioId: number, data: AddItemDto) {
    const carrito = await this.getOrCreateActiveCart(usuarioId);

    // Verificar que el producto exista y esté disponible
    const producto = await this.prisma.producto.findUnique({
      where: { id: data.producto_id },
    });
    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${data.producto_id} no encontrado`,
      );
    }

    if (producto.estado === 'retirado' || producto.estado === 'agotado') {
      throw new BadRequestException(
        'El producto no está disponible para compra',
      );
    }

    if (producto.cantidad_disponible < data.cantidad) {
      throw new BadRequestException(
        `Stock insuficiente. Solo quedan ${producto.cantidad_disponible} unidades disponibles.`,
      );
    }

    // Buscar si ya está en el carrito
    const detalleExistente = carrito.carrito_detalle.find(
      (d) => d.producto_id === data.producto_id,
    );

    const precioUnitario =
      producto.precio_descuento !== null
        ? producto.precio_descuento
        : producto.precio_original;

    if (detalleExistente) {
      const nuevaCantidad = detalleExistente.cantidad + data.cantidad;
      if (producto.cantidad_disponible < nuevaCantidad) {
        throw new BadRequestException(
          `Stock insuficiente para agregar esa cantidad. Total en carrito superaría stock disponible.`,
        );
      }
      return this.prisma.carritoDetalle.update({
        where: { id: detalleExistente.id },
        data: {
          cantidad: nuevaCantidad,
          precio_unitario: precioUnitario,
        },
      });
    } else {
      return this.prisma.carritoDetalle.create({
        data: {
          carrito_id: carrito.id,
          producto_id: data.producto_id,
          cantidad: data.cantidad,
          precio_unitario: precioUnitario,
        },
      });
    }
  }

  async updateItem(usuarioId: number, detalleId: number, data: UpdateItemDto) {
    const carrito = await this.getOrCreateActiveCart(usuarioId);

    const detalle = carrito.carrito_detalle.find((d) => d.id === detalleId);
    if (!detalle) {
      throw new NotFoundException(
        `Detalle del carrito con ID ${detalleId} no encontrado`,
      );
    }

    // Verificar stock del producto
    const producto = await this.prisma.producto.findUnique({
      where: { id: detalle.producto_id! },
    });
    if (!producto) {
      throw new NotFoundException('El producto no existe');
    }

    if (producto.cantidad_disponible < data.cantidad) {
      throw new BadRequestException(
        `Stock insuficiente. Solo quedan ${producto.cantidad_disponible} unidades disponibles.`,
      );
    }

    const precioUnitario =
      producto.precio_descuento !== null
        ? producto.precio_descuento
        : producto.precio_original;

    return this.prisma.carritoDetalle.update({
      where: { id: detalleId },
      data: {
        cantidad: data.cantidad,
        precio_unitario: precioUnitario,
      },
    });
  }

  async removeItem(usuarioId: number, detalleId: number) {
    const carrito = await this.getOrCreateActiveCart(usuarioId);

    const detalle = carrito.carrito_detalle.find((d) => d.id === detalleId);
    if (!detalle) {
      throw new NotFoundException(
        `Detalle del carrito con ID ${detalleId} no encontrado`,
      );
    }

    return this.prisma.carritoDetalle.delete({
      where: { id: detalleId },
    });
  }

  async clearCart(usuarioId: number) {
    const carrito = await this.getOrCreateActiveCart(usuarioId);

    return this.prisma.carritoDetalle.deleteMany({
      where: { carrito_id: carrito.id },
    });
  }
}
