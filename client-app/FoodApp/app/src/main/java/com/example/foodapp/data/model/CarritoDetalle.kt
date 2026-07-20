package com.example.foodapp.data.model

data class CarritoDetalle(

    val id: Int,

    val carrito_id: Int,

    val producto_id: Int,

    val cantidad: Int,

    val precio_unitario: String,

    val productos: Producto

)