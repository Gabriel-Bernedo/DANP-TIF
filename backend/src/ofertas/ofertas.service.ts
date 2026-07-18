import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOfertaDto } from './dto/create-oferta.dto';
import { UpdateOfertaDto } from './dto/update-oferta.dto';

@Injectable()
export class OfertasService {
  constructor(private prisma: PrismaService) {}

  private async updateProductDiscount(
    productoId: number,
    porcentajeDescuento: number | null,
  ) {
    const producto = await this.prisma.producto.findUnique({
      where: { id: productoId },
    });
    if (!producto) return;

    if (porcentajeDescuento === null || porcentajeDescuento === 0) {
      await this.prisma.producto.update({
        where: { id: productoId },
        data: { precio_descuento: null },
      });
    } else {
      const precioOriginal = Number(producto.precio_original);
      const precioDescuento = precioOriginal * (1 - porcentajeDescuento / 100);
      await this.prisma.producto.update({
        where: { id: productoId },
        data: { precio_descuento: precioDescuento },
      });
    }
  }

  async create(data: CreateOfertaDto) {
    const producto = await this.prisma.producto.findUnique({
      where: { id: data.producto_id },
    });
    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${data.producto_id} no encontrado`,
      );
    }

    const oferta = await this.prisma.ofertaEspecial.create({
      data: {
        producto_id: data.producto_id,
        porcentaje_descuento: data.porcentaje_descuento,
        fecha_inicio: new Date(data.fecha_inicio),
        fecha_fin: new Date(data.fecha_fin),
        estado: data.estado || 'activa',
      },
    });

    if (oferta.estado === 'activa') {
      await this.updateProductDiscount(
        data.producto_id,
        data.porcentaje_descuento,
      );
    }

    return oferta;
  }

  async findAll() {
    return this.prisma.ofertaEspecial.findMany({
      include: {
        productos: true,
      },
    });
  }

  async findOne(id: number) {
    const oferta = await this.prisma.ofertaEspecial.findUnique({
      where: { id },
      include: {
        productos: true,
      },
    });
    if (!oferta) {
      throw new NotFoundException(`Oferta especial con ID ${id} no encontrada`);
    }
    return oferta;
  }

  async update(id: number, data: UpdateOfertaDto) {
    const ofertaExistente = await this.findOne(id);

    const updatedOferta = await this.prisma.ofertaEspecial.update({
      where: { id },
      data: {
        producto_id: data.producto_id,
        porcentaje_descuento: data.porcentaje_descuento,
        fecha_inicio: data.fecha_inicio
          ? new Date(data.fecha_inicio)
          : undefined,
        fecha_fin: data.fecha_fin ? new Date(data.fecha_fin) : undefined,
        estado: data.estado,
      },
    });

    // Si cambió el producto, el porcentaje o el estado, recalculamos descuentos
    const prodId = updatedOferta.producto_id || ofertaExistente.producto_id;
    if (prodId) {
      if (updatedOferta.estado === 'activa') {
        const pct = updatedOferta.porcentaje_descuento
          ? Number(updatedOferta.porcentaje_descuento)
          : 0;
        await this.updateProductDiscount(prodId, pct);
      } else {
        await this.updateProductDiscount(prodId, null);
      }
    }

    // Si el producto cambió, limpiamos el anterior
    if (
      data.producto_id &&
      data.producto_id !== ofertaExistente.producto_id &&
      ofertaExistente.producto_id
    ) {
      await this.updateProductDiscount(ofertaExistente.producto_id, null);
    }

    return updatedOferta;
  }

  async remove(id: number) {
    const oferta = await this.findOne(id);

    if (oferta.producto_id) {
      await this.updateProductDiscount(oferta.producto_id, null);
    }

    return this.prisma.ofertaEspecial.delete({
      where: { id },
    });
  }
}
