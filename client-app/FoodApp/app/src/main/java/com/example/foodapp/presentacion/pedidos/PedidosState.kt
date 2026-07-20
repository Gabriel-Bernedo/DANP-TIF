package com.example.foodapp.presentacion.pedidos


import com.example.foodapp.data.model.Pedido


data class PedidoState(

    val pedidos: List<Pedido> = emptyList(),

    val isLoading:Boolean = false,

    val error:String? = null

)