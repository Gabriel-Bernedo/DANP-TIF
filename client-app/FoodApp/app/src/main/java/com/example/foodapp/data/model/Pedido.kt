package com.example.foodapp.data.model

data class Pedido(

    val id: Int,

    val usuario_id: Int,

    val fecha_pedido: String,

    val fecha_entrega_estimada: String?,

    val direccion_entrega: String,

    val metodo_pago: String,

    val estado: String,

    val total: String,

    val pedido_detalle: List<PedidoDetalle>

)