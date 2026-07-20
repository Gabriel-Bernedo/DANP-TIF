package com.example.foodapp.data.repository

import com.example.foodapp.data.model.AddToCartRequest
import com.example.foodapp.data.model.Producto
import com.example.foodapp.domain.repository.ProductoRepository
import com.example.foodapp.network.ApiService
import retrofit2.Response
import javax.inject.Inject
import com.example.foodapp.data.model.CarritoResponse



class ProductoRepositoryImpl @Inject constructor(
    private val api: ApiService
) : ProductoRepository {



    override suspend fun getProductos():
            Response<List<Producto>> {

        return api.getProductos()

    }



    override suspend fun getProductoById(
        id: Int
    ): Response<Producto> {

        return api.getProductoById(id)

    }



    override suspend fun agregarAlCarrito(
        request: AddToCartRequest
    ): Response<Unit> {

        return api.agregarAlCarrito(request)

    }

    override suspend fun obtenerCarrito():
            Response<CarritoResponse> {

        return api.obtenerCarrito()

    }

    override suspend fun eliminarProductoCarrito(
        detalleId: Int
    ): Response<Unit> {

        return api.eliminarProductoCarrito(detalleId)

    }


}