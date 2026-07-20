package com.example.foodapp.data.model

data class CarritoResponse(

    val id: Int,

    val usuario_id: Int,

    val fecha_creacion: String,

    val estado: String,

    val carrito_detalle: List<CarritoDetalle>

)



