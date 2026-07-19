import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { 
  administradoresData, usuariosData, categoriasData, 
  getProductosData, getOfertasData 
} from './seed-data';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap() {
    // Check if seeding is requested. Defaults to false if not provided or anything other than 'true'
    const trySeed = process.env.TRY_SEED === 'true';

    if (!trySeed) {
      this.logger.log('TRY_SEED is false or not set. Skipping database seed.');
      return;
    }

    this.logger.log('TRY_SEED is true. Checking if database needs to be populated...');

    try {
      // Check for a test record to determine if DB is already seeded
      const testEmail = 'admin@admin.com';
      const existingAdmin = await this.prisma.administrador.findUnique({
        where: { email: testEmail },
      });

      if (existingAdmin) {
        this.logger.log(`Test record (${testEmail}) already exists. Bulk insert skipped.`);
        return;
      }

      this.logger.log('Test record not found. Running seed...');
      
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('admin', saltRounds);

      // Seed Administradores
      await this.prisma.administrador.createMany({
        data: administradoresData.map(a => ({ ...a, password_hash: hashedPassword })),
        skipDuplicates: true,
      });

      // Seed Usuarios
      await this.prisma.usuario.createMany({
        data: usuariosData.map(u => ({ ...u, password_hash: hashedPassword })),
        skipDuplicates: true,
      });

      // Seed Categorias
      await this.prisma.categoria.createMany({
        data: categoriasData,
        skipDuplicates: true,
      });

      // Fetch references for relational data
      const admin = await this.prisma.administrador.findFirst({ where: { email: 'admin@admin.com' } });
      const frutasCat = await this.prisma.categoria.findFirst({ where: { nombre: 'Frutas y Verduras' } });
      const lacteosCat = await this.prisma.categoria.findFirst({ where: { nombre: 'Lácteos' } });
      const panaderiaCat = await this.prisma.categoria.findFirst({ where: { nombre: 'Panadería' } });
      const gaboUser = await this.prisma.usuario.findFirst({ where: { email: 'gabo@example.com' } });

      if (admin && frutasCat && lacteosCat && panaderiaCat) {
        // Seed Productos
        const productosData = getProductosData(admin.id, frutasCat.id, lacteosCat.id, panaderiaCat.id);
        await this.prisma.producto.createMany({
          data: productosData,
          skipDuplicates: true,
        });

        const prodManzanas = await this.prisma.producto.findFirst({ where: { nombre: 'Manzanas Orgánicas (1kg)' } });
        const prodQueso = await this.prisma.producto.findFirst({ where: { nombre: 'Queso Fresco (500g)' } });

        if (prodManzanas && prodQueso) {
          // Seed Ofertas
          const ofertasData = getOfertasData(prodManzanas.id, prodQueso.id);
          await this.prisma.ofertaEspecial.createMany({
            data: ofertasData,
            skipDuplicates: true,
          });

          if (gaboUser) {
            // Seed Carrito (relaciones anidadas)
            await this.prisma.carrito.create({
              data: {
                usuario_id: gaboUser.id,
                estado: 'activo',
                carrito_detalle: {
                  create: [
                    { producto_id: prodManzanas.id, cantidad: 2, precio_unitario: 2.5 },
                    { producto_id: prodQueso.id, cantidad: 1, precio_unitario: 4.0 },
                  ]
                }
              }
            });

            // Seed Pedido (relaciones anidadas)
            await this.prisma.pedido.create({
              data: {
                usuario_id: gaboUser.id,
                direccion_entrega: gaboUser.direccion,
                metodo_pago: 'Tarjeta',
                estado: 'pendiente',
                total: 9.0, // 2*2.5 + 1*4.0 = 5 + 4
                pedido_detalle: {
                  create: [
                    { producto_id: prodManzanas.id, cantidad: 2, precio_unitario: 2.5, subtotal: 5.0 },
                    { producto_id: prodQueso.id, cantidad: 1, precio_unitario: 4.0, subtotal: 4.0 },
                  ]
                }
              }
            });
          }
        }
      }

      this.logger.log('Database successfully seeded!');
    } catch (error) {
      this.logger.error('Error while trying to seed the database:', error);
    }
  }
}
