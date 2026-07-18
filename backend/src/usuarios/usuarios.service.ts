import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(data: RegisterDto) {
    const existe = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });
    if (existe) {
      throw new ConflictException('Ya existe un usuario con ese email');
    }

    const password_hash = await bcrypt.hash(data.password, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password_hash,
        telefono: data.telefono,
        direccion: data.direccion,
      },
    });

    const usuarioSinPassword = { ...usuario } as Partial<typeof usuario>;
    delete usuarioSinPassword.password_hash;
    return usuarioSinPassword;
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        telefono: true,
        direccion: true,
        estado: true,
        fecha_registro: true,
      },
    });
  }
}
