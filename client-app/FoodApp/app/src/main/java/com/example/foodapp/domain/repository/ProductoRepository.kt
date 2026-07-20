package com.example.foodapp.domain.repository

import com.example.foodapp.data.model.Producto
import retrofit2.Response

interface ProductoRepository {

    suspend fun getProductos(): Response<List<Producto>>
    suspend fun getProductoById(
        id: Int
    ): Response<Producto>

}