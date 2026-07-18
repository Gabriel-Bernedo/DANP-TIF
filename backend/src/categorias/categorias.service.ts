import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
      },
    });
  }

  async findAll() {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: number) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return categoria;
  }

  async update(id: number, data: UpdateCategoriaDto) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.categoria.update({
      where: { id },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica existencia
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
