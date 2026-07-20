package com.example.foodapp.data.model

data class Producto(
    val id: Int,
    val nombre: String,
    val descripcion: String,
    val precio_original: String,
    val precio_descuento: String,
    val cantidad_disponible: Int,
    val fecha_vencimiento: String,
    val fecha_publicacion: String,
    val imagen_url: String?,
    val estado: String,
    val categoria_id: Int,
    val administrador_id: Int,
    val categorias: Categoria
)