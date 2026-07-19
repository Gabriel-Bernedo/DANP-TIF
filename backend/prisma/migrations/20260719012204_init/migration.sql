-- CreateTable
CREATE TABLE "administradores" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(50) DEFAULT 'gestor_productos',
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "administradores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(20),
    "direccion" VARCHAR(255),
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "estado" VARCHAR(20) DEFAULT 'activo',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(150) NOT NULL,
    "descripcion" TEXT,
    "precio_original" DECIMAL(10,2) NOT NULL,
    "precio_descuento" DECIMAL(10,2),
    "cantidad_disponible" INTEGER NOT NULL DEFAULT 0,
    "fecha_vencimiento" DATE NOT NULL,
    "fecha_publicacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "imagen_url" VARCHAR(255),
    "estado" VARCHAR(20) DEFAULT 'disponible',
    "categoria_id" INTEGER,
    "administrador_id" INTEGER,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ofertas_especiales" (
    "id" SERIAL NOT NULL,
    "producto_id" INTEGER,
    "porcentaje_descuento" DECIMAL(5,2) NOT NULL,
    "fecha_inicio" TIMESTAMP(6) NOT NULL,
    "fecha_fin" TIMESTAMP(6) NOT NULL,
    "estado" VARCHAR(20) DEFAULT 'activa',

    CONSTRAINT "ofertas_especiales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carritos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "estado" VARCHAR(20) DEFAULT 'activo',

    CONSTRAINT "carritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrito_detalle" (
    "id" SERIAL NOT NULL,
    "carrito_id" INTEGER,
    "producto_id" INTEGER,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "precio_unitario" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "carrito_detalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "fecha_pedido" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fecha_entrega_estimada" TIMESTAMP(6),
    "direccion_entrega" VARCHAR(255),
    "metodo_pago" VARCHAR(50),
    "estado" VARCHAR(20) DEFAULT 'pendiente',
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido_detalle" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER,
    "producto_id" INTEGER,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "pedido_detalle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "administradores_email_key" ON "administradores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_administrador_id_fkey" FOREIGN KEY ("administrador_id") REFERENCES "administradores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ofertas_especiales" ADD CONSTRAINT "ofertas_especiales_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carritos" ADD CONSTRAINT "carritos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carrito_detalle" ADD CONSTRAINT "carrito_detalle_carrito_id_fkey" FOREIGN KEY ("carrito_id") REFERENCES "carritos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carrito_detalle" ADD CONSTRAINT "carrito_detalle_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedido_detalle" ADD CONSTRAINT "pedido_detalle_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedido_detalle" ADD CONSTRAINT "pedido_detalle_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
