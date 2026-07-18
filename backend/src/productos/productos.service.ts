import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductoDto, adminId: number) {
    // Verificar si existe la categoría
    const categoria = await this.prisma.categoria.findUnique({
      where: { id: data.categoria_id },
    });
    if (!categoria) {
      throw new NotFoundException(
        `Categoría con ID ${data.categoria_id} no encontrada`,
      );
    }

    return this.prisma.producto.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio_original: data.precio_original,
        precio_descuento: data.precio_descuento,
        cantidad_disponible: data.cantidad_disponible,
        fecha_vencimiento: new Date(data.fecha_vencimiento),
        imagen_url: data.imagen_url,
        estado: data.estado || 'disponible',
        categoria_id: data.categoria_id,
        administrador_id: adminId,
      },
    });
  }

  async findAll(filters: {
    categoria_id?: number;
    estado?: string;
    busqueda?: string;
  }) {
    const where: Prisma.ProductoWhereInput = {};

    if (filters.categoria_id) {
      where.categoria_id = filters.categoria_id;
    }

    if (filters.estado) {
      where.estado = filters.estado;
    } else {
      // Por defecto no mostrar los retirados
      where.estado = { not: 'retirado' };
    }

    if (filters.busqueda) {
      where.OR = [
        { nombre: { contains: filters.busqueda, mode: 'insensitive' } },
        { descripcion: { contains: filters.busqueda, mode: 'insensitive' } },
      ];
    }

    return this.prisma.producto.findMany({
      where,
      include: {
        categorias: true,
      },
    });
  }

  async findOne(id: number) {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: {
        categorias: true,
        administradores: {
          select: {
            id: true,
            nombre: true,
            email: true,
            rol: true,
          },
        },
      },
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: number, data: UpdateProductoDto) {
    await this.findOne(id); // Verificar existencia

    if (data.categoria_id) {
      const categoria = await this.prisma.categoria.findUnique({
        where: { id: data.categoria_id },
      });
      if (!categoria) {
        throw new NotFoundException(
          `Categoría con ID ${data.categoria_id} no encontrada`,
        );
      }
    }

    return this.prisma.producto.update({
      where: { id },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio_original: data.precio_original,
        precio_descuento: data.precio_descuento,
        cantidad_disponible: data.cantidad_disponible,
        fecha_vencimiento: data.fecha_vencimiento
          ? new Date(data.fecha_vencimiento)
          : undefined,
        imagen_url: data.imagen_url,
        estado: data.estado,
        categoria_id: data.categoria_id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verificar existencia

    try {
      // Intentar borrado físico
      return await this.prisma.producto.delete({
        where: { id },
      });
    } catch {
      // Si falla por restricciones de integridad (ej: hay pedidos históricos), hacemos borrado lógico cambiando estado a 'retirado'
      return this.prisma.producto.update({
        where: { id },
        data: { estado: 'retirado' },
      });
    }
  }
}
