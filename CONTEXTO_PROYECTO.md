# Contexto del proyecto — DANP-TIF

## Descripción general

DANP-TIF es una solución tecnológica que conecta **clientes** y **administradores** para reducir el desperdicio de alimentos, mediante la publicación y adquisición de productos próximos a vencer o excedentes de comida a precios accesibles.

El proyecto tiene 4 componentes:
1. Aplicación para Clientes
2. Página Web para Administrador
3. Base de Datos Relacional
4. Despliegue en la Nube

Se está desarrollando **por partes**, y actualmente el foco es el **backend** (API REST).

## Pantallas / funcionalidades requeridas

### Aplicación Clientes
- Iniciar sesión
- Registrar cuenta
- Pantalla Principal
- Productos
- Carrito de compra
- Formulario pedido
- Mis pedidos
- Ofertas especiales

### Página Web — Administrador
- Productos
- Usuarios
- Ofertas
- Pedido

## Stack tecnológico

- **Backend**: NestJS (TypeScript)
- **ORM**: Prisma, usando el generador nuevo `prisma-client` (no el clásico `prisma-client-js`) con `moduleFormat = "cjs"` y driver adapter `@prisma/adapter-pg` para conectar a PostgreSQL
- **Base de datos**: PostgreSQL 16 (alpine), corriendo en Docker
- **Autenticación**: JWT (`@nestjs/jwt`, `passport-jwt`), passwords hasheados con `bcrypt`
- **Validación**: `class-validator` + `class-transformer`, con `ValidationPipe({ whitelist: true, transform: true })` global
- **Documentación de API**: Swagger (`@nestjs/swagger`), disponible en `/api/docs`
- **Contenedores**: todo el stack (Nest + Postgres) corre en Docker Compose. Postgres usa `expose` (solo accesible entre contenedores, no publicado al host); el backend usa `ports` (publicado en `localhost:3000` para poder probarlo desde fuera de Docker)
- El plan es dejar el backend **listo para desplegar**, por eso ya existe un `Dockerfile` multi-stage (build + producción) además del de desarrollo

## Estructura de carpetas actual

```
DANP-TIF/
├── docker-compose.yml          # desarrollo (con volúmenes, hot-reload)
├── docker-compose.prod.yml     # producción (imagen "horneada", sin volúmenes)
├── .env                        # credenciales de Postgres/Docker
└── backend/
    ├── .env                    # DATABASE_URL, JWT_SECRET
    ├── Dockerfile               # multi-stage: build + production
    ├── prisma/
    │   └── schema.prisma
    ├── src/
    │   ├── main.ts              # ValidationPipe global + configuración de Swagger
    │   ├── app.module.ts
    │   ├── prisma/
    │   │   ├── prisma.module.ts   # @Global(), exporta PrismaService
    │   │   └── prisma.service.ts  # extiende PrismaClient, usa adapter-pg
    │   ├── usuarios/
    │   │   ├── usuarios.module.ts
    │   │   ├── usuarios.controller.ts
    │   │   ├── usuarios.service.ts
    │   │   └── dto/
    │   │       ├── register.dto.ts
    │   │       └── login.dto.ts
    │   └── auth/
    │       ├── auth.module.ts       # JwtModule.registerAsync con ConfigService
    │       ├── auth.controller.ts
    │       ├── auth.service.ts
    │       └── jwt.strategy.ts      # usa ConfigService.get('JWT_SECRET')
    └── generated/prisma/        # cliente Prisma generado (output custom)
```

## Modelo de datos (Prisma / PostgreSQL)

Todas las tablas ya están creadas en PostgreSQL. Los modelos de Prisma están en **PascalCase singular** mapeados a las tablas reales (snake_case plural) con `@@map`.

| Modelo Prisma      | Tabla real           | Relaciones principales |
|---------------------|-----------------------|--------------------------|
| `Usuario`            | `usuarios`             | tiene muchos `Carrito`, `Pedido` |
| `Administrador`      | `administradores`      | tiene muchos `Producto` |
| `Categoria`           | `categorias`            | tiene muchos `Producto` |
| `Producto`            | `productos`             | pertenece a `Categoria` y `Administrador`; tiene `CarritoDetalle`, `OfertaEspecial`, `PedidoDetalle` |
| `OfertaEspecial`      | `ofertas_especiales`    | pertenece a `Producto` |
| `Carrito`             | `carritos`              | pertenece a `Usuario`; tiene `CarritoDetalle` |
| `CarritoDetalle`      | `carrito_detalle`       | pertenece a `Carrito` y `Producto` |
| `Pedido`              | `pedidos`               | pertenece a `Usuario`; tiene `PedidoDetalle` |
| `PedidoDetalle`       | `pedido_detalle`        | pertenece a `Pedido` y `Producto` |

Campos relevantes de `Producto`: `precio_original`, `precio_descuento`, `cantidad_disponible`, `fecha_vencimiento`, `fecha_publicacion`, `imagen_url`, `estado` (`disponible`, `agotado`, `vencido`, `retirado`), relación a `categoria_id` y `administrador_id`.

## Lo que ya está implementado (backend)

- ✅ PostgreSQL en Docker con las 9 tablas
- ✅ Prisma conectado (schema con `@@map`, cliente generado con driver adapter)
- ✅ `PrismaModule` / `PrismaService` global
- ✅ Módulo `usuarios`: registro (`POST /usuarios/registro`) y listado (`GET /usuarios`), sin exponer `password_hash`
- ✅ Módulo `auth`: login (`POST /auth/login`) devuelve JWT + datos básicos del usuario
- ✅ `JwtStrategy` lista para proteger rutas (aún no aplicada a ningún endpoint)
- ✅ Swagger documentando `usuarios` y `auth`
- ✅ Docker de desarrollo y de producción (multi-stage) funcionando

## Lo que falta (próximos CRUDs a desarrollar)

- **Productos**: CRUD completo (crear, listar, editar, eliminar/retirar), probablemente restringido a administradores
- **Categorías**: CRUD simple (probablemente solo admin)
- **Ofertas especiales**: CRUD asociado a productos
- **Carrito**: agregar/quitar productos, ver carrito del usuario logueado
- **Pedidos**: crear pedido desde el carrito, listar "mis pedidos" (protegido, solo el usuario dueño), y vista de administración de pedidos
- Proteger rutas sensibles con `JwtStrategy` / `AuthGuard('jwt')` (por ejemplo "Mis pedidos" y todo el panel de administrador)
- Posiblemente diferenciar roles (cliente vs administrador) para restringir endpoints — actualmente `Administrador` y `Usuario` son tablas separadas, sin un sistema de roles unificado todavía

## Convenciones del proyecto a mantener

- Nombres de modelos Prisma en español, PascalCase singular, con `@@map` a la tabla real en snake_case
- DTOs con `class-validator` + `@ApiProperty` (Swagger) para cada campo
- Servicios nunca devuelven `password_hash` u otros campos sensibles
- Cada nuevo módulo sigue el patrón: `module` + `controller` + `service` + carpeta `dto/`
- Documentar cada endpoint nuevo con `@ApiTags`, `@ApiOperation`, `@ApiResponse`
- Todo debe poder correr tanto en el Docker de desarrollo (con hot-reload) como construirse con el Dockerfile de producción (multi-stage) sin cambios de código
