import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdministradoresService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAdminDto) {
    const existe = await this.prisma.administrador.findUnique({
      where: { email: data.email },
    });
    if (existe) {
      throw new ConflictException('Ya existe un administrador con ese email');
    }

    const password_hash = await bcrypt.hash(data.password, 10);

    const admin = await this.prisma.administrador.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        password_hash,
        rol: data.rol || 'gestor_productos',
      },
    });

    const adminSinPassword = { ...admin } as Partial<typeof admin>;
    delete adminSinPassword.password_hash;
    return adminSinPassword;
  }

  async findAll() {
    return this.prisma.administrador.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        fecha_registro: true,
      },
    });
  }

  async findOne(id: number) {
    const admin = await this.prisma.administrador.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        fecha_registro: true,
      },
    });
    if (!admin) {
      throw new NotFoundException(`Administrador con ID ${id} no encontrado`);
    }
    return admin;
  }
}
