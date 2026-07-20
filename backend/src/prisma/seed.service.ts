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
    const trySeed = process.env.TRY_SEED === 'true';
    const seedForce = process.env.SEED_FORCE === 'true';

    if (!trySeed && !seedForce) {
      this.logger.log('TRY_SEED and SEED_FORCE are false or not set. Skipping database seed.');
      return;
    }

    try {
      if (seedForce) {
        this.logger.log('SEED_FORCE is true. Wiping database...');
        // Delete in cascade order
        await this.prisma.pedidoDetalle.deleteMany();
        await this.prisma.pedido.deleteMany();
        await this.prisma.carritoDetalle.deleteMany();
        await this.prisma.carrito.deleteMany();
        await this.prisma.ofertaEspecial.deleteMany();
        await this.prisma.producto.deleteMany();
        await this.prisma.categoria.deleteMany();
        await this.prisma.usuario.deleteMany();
        await this.prisma.administrador.deleteMany();
        this.logger.log('Database wiped successfully.');
      } else {
        this.logger.log('TRY_SEED is true. Checking if database needs to be populated...');
        const testEmail = 'admin@admin.com';
        const existingAdmin = await this.prisma.administrador.findUnique({
          where: { email: testEmail },
        });

        if (existingAdmin) {
          this.logger.log(`Test record (${testEmail}) already exists. Bulk insert skipped.`);
          return;
        }
        this.logger.log('Test record not found. Running seed...');
      }

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

      const admin = await this.prisma.administrador.findFirst({ where: { email: 'admin@admin.com' } });
      const categorias = await this.prisma.categoria.findMany();
      const usuarios = await this.prisma.usuario.findMany();

      if (admin && categorias.length === 5) {
        // Seed Productos
        const catIds = categorias.map(c => c.id);
        const productosData = getProductosData(admin.id, catIds);
        await this.prisma.producto.createMany({
          data: productosData,
          skipDuplicates: true,
        });

        const productosDB = await this.prisma.producto.findMany();
        if (productosDB.length > 0) {
          const productIds = productosDB.map(p => p.id);
          const ofertasData = getOfertasData(productIds);
          await this.prisma.ofertaEspecial.createMany({
            data: ofertasData,
            skipDuplicates: true,
          });

          // Create 2 Carts and Orders for each user
          for (const user of usuarios) {
            for (let i = 0; i < 2; i++) {
              // Pick 2 random products for the cart
              const p1 = productosDB[Math.floor(Math.random() * productosDB.length)];
              const p2 = productosDB[Math.floor(Math.random() * productosDB.length)];
              
              const p1Price = Number(p1.precio_descuento || p1.precio_original);
              const p2Price = Number(p2.precio_descuento || p2.precio_original);
              const qty1 = Math.floor(Math.random() * 3) + 1;
              const qty2 = Math.floor(Math.random() * 2) + 1;
              
              const total = (p1Price * qty1) + (p2Price * qty2);

              // Create Carrito
              await this.prisma.carrito.create({
                data: {
                  usuario_id: user.id,
                  estado: 'activo',
                  carrito_detalle: {
                    create: [
                      { producto_id: p1.id, cantidad: qty1, precio_unitario: p1Price },
                      { producto_id: p2.id, cantidad: qty2, precio_unitario: p2Price },
                    ]
                  }
                }
              });

              // Create Pedido
              await this.prisma.pedido.create({
                data: {
                  usuario_id: user.id,
                  direccion_entrega: user.direccion,
                  metodo_pago: i % 2 === 0 ? 'Tarjeta' : 'Efectivo',
                  estado: i % 2 === 0 ? 'completado' : 'pendiente',
                  total: total,
                  pedido_detalle: {
                    create: [
                      { producto_id: p1.id, cantidad: qty1, precio_unitario: p1Price, subtotal: p1Price * qty1 },
                      { producto_id: p2.id, cantidad: qty2, precio_unitario: p2Price, subtotal: p2Price * qty2 },
                    ]
                  }
                }
              });
            }
          }
        }
      }

      this.logger.log('Database successfully seeded with expanded data!');
    } catch (error) {
      this.logger.error('Error while trying to seed the database:', error);
    }
  }
}
