# DANP-TIF — Backend

API del proyecto DANP-TIF: solución tecnológica que conecta clientes y administradores para reducir el desperdicio de alimentos mediante la publicación y adquisición de productos próximos a vencer o excedentes de comida a precios accesibles.

## Stack

- **NestJS** (Node.js + TypeScript)
- **Prisma ORM** (generador `prisma-client` + driver adapter `@prisma/adapter-pg`)
- **PostgreSQL** (en Docker)
- **JWT** para autenticación
- **Swagger** para documentación de la API

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado y corriendo
- [Node.js](https://nodejs.org/) (v20 o superior recomendado)
- npm

## Estructura del proyecto

```
DANP-TIF/
├── docker-compose.yml       # Levanta PostgreSQL
├── .env                     # Credenciales de Docker/Postgres
└── backend/
    ├── .env                 # DATABASE_URL y JWT_SECRET para Nest
    ├── prisma/
    │   └── schema.prisma
    ├── src/
    │   ├── prisma/          # PrismaModule + PrismaService
    │   ├── usuarios/        # Registro y listado de usuarios
    │   └── auth/            # Login (JWT)
    └── generated/prisma/    # Cliente de Prisma generado
```

## 1. Levantar la base de datos (Docker)

Desde la raíz del proyecto (`DANP-TIF/`), donde está el `docker-compose.yml`:

```bash
docker compose up -d
```

Verifica que el contenedor esté corriendo:

```bash
docker ps
```

Para detenerlo (sin perder datos):

```bash
docker compose down
```

Para detenerlo y borrar los datos (reinicio total):

```bash
docker compose down -v
```


## 2. Configurar el backend

Entra a la carpeta del backend:

```bash
cd backend
npm install
```


### Generar el cliente de Prisma

Si es la primera vez, o si el schema cambió:

```bash
npx prisma generate
```

Si las tablas cambiaron directamente en la base de datos y quieres traer los cambios a `schema.prisma`:

```bash
npx prisma db pull
```

## 3. Levantar el backend

```bash
npm run start:dev
```

La API queda disponible en:

```
http://localhost:3000
```

## 4. Documentación de la API (Swagger)

Con el backend corriendo, abre en el navegador:

```
http://localhost:3000/api/docs
```

Ahí puedes ver y probar todos los endpoints, incluyendo el botón **Authorize** para pegar el JWT en las rutas protegidas.

## Endpoints disponibles hasta ahora

| Método | Ruta                  | Descripción                     | Protegido |
|--------|-----------------------|----------------------------------|-----------|
| POST   | `/usuarios/registro`  | Registrar un nuevo usuario       | No        |
| GET    | `/usuarios`           | Listar todos los usuarios        | No        |
| POST   | `/auth/login`         | Iniciar sesión (devuelve JWT)    | No        |

## Probar rápido con curl

```bash
# Registro
curl -X POST http://localhost:3000/usuarios/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana","apellido":"Perez","email":"ana@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ana@test.com","password":"123456"}'
```
