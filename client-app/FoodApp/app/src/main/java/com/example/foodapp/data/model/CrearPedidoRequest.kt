package com.example.foodapp.data.model

data class CrearPedidoRequest(

    val direccion_entrega: String,

    val metodo_pago: String,

    val fecha_entrega_estimada: String

)