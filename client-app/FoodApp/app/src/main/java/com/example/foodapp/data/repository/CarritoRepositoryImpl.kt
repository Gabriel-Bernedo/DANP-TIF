package com.example.foodapp.data.repository

import com.example.foodapp.data.model.AddToCartRequest
import com.example.foodapp.data.model.CarritoResponse
import com.example.foodapp.domain.repository.CarritoRepository
import com.example.foodapp.network.ApiService
import retrofit2.Response
import javax.inject.Inject

class CarritoRepositoryImpl @Inject constructor(
    private val api: ApiService
) : CarritoRepository {

    override suspend fun obtenerCarrito(): Response<CarritoResponse> {
        return api.obtenerCarrito()
    }

    override suspend fun agregarAlCarrito(
        request: AddToCartRequest
    ): Response<Unit> {
        return api.agregarAlCarrito(request)
    }

    override suspend fun eliminarProducto(
        detalleId: Int
    ): Response<Unit> {
        return api.eliminarProductoCarrito(detalleId)
    }

}