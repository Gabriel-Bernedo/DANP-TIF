package com.example.foodapp.domain.repository

import com.example.foodapp.data.model.CrearPedidoRequest
import com.example.foodapp.data.model.Pedido
import retrofit2.Response



interface PedidoRepository {



    suspend fun getMisPedidos():
            Response<List<Pedido>>



    suspend fun crearPedido(
        request: CrearPedidoRequest
    ): Response<Pedido>


}