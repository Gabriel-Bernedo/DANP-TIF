package com.example.foodapp.data.repository

import com.example.foodapp.data.model.CrearPedidoRequest
import com.example.foodapp.data.model.Pedido
import com.example.foodapp.domain.repository.PedidoRepository
import com.example.foodapp.network.ApiService
import retrofit2.Response
import javax.inject.Inject



class PedidoRepositoryImpl @Inject constructor(

    private val api: ApiService

) : PedidoRepository {



    override suspend fun getMisPedidos():
            Response<List<Pedido>> {


        return api.getMisPedidos()


    }



    override suspend fun crearPedido(
        request: CrearPedidoRequest
    ): Response<Pedido> {


        return api.crearPedido(request)


    }


}