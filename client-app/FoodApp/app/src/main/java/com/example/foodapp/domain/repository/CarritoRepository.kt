package com.example.foodapp.domain.repository

import com.example.foodapp.data.model.AddToCartRequest
import com.example.foodapp.data.model.CarritoResponse
import retrofit2.Response

interface CarritoRepository {

    suspend fun obtenerCarrito(): Response<CarritoResponse>
    suspend fun agregarAlCarrito(
        request: AddToCartRequest
    ): Response<Unit>

    suspend fun eliminarProducto(
        detalleId: Int
    ): Response<Unit>

}