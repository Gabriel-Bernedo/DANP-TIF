package com.example.foodapp.domain.repository

import com.example.foodapp.data.model.AddToCartRequest
import com.example.foodapp.data.model.CarritoResponse
import com.example.foodapp.data.model.Producto
import retrofit2.Response


interface ProductoRepository {


    suspend fun getProductos():
            Response<List<Producto>>



    suspend fun getProductoById(
        id: Int
    ): Response<Producto>



    suspend fun agregarAlCarrito(
        request: AddToCartRequest
    ): Response<Unit>



    suspend fun obtenerCarrito():
            Response<CarritoResponse>

    suspend fun eliminarProductoCarrito(
        detalleId: Int
    ): Response<Unit>


}