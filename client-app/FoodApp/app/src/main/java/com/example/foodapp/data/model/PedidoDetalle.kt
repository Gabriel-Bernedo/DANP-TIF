package com.example.foodapp.data.model


data class PedidoDetalle(

    val id: Int,

    val pedido_id: Int,

    val producto_id: Int,

    val cantidad: Int,

    val precio_unitario: String,

    val subtotal: String,

    val productos: Producto

)