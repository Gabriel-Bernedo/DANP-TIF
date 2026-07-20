package com.example.foodapp.network

import com.example.foodapp.data.model.LoginRequest
import com.example.foodapp.data.model.LoginResponse
import com.example.foodapp.data.model.RegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.GET
import com.example.foodapp.data.model.Producto
import retrofit2.http.Path
import com.example.foodapp.data.model.AddToCartRequest
import com.example.foodapp.data.model.CarritoResponse
import com.example.foodapp.data.model.CrearPedidoRequest
import com.example.foodapp.data.model.Pedido
import retrofit2.http.DELETE


interface ApiService {

    @POST("auth/login")
    suspend fun login(
        @Body request: LoginRequest
    ): Response<LoginResponse>

    @POST("usuarios/registro")
    suspend fun register(
        @Body request: RegisterRequest
    ): Response<Unit>

    @GET("productos")
    suspend fun getProductos(): Response<List<Producto>>

    @GET("productos/{id}")
    suspend fun getProductoById(
        @Path("id") id: Int
    ): Response<Producto>

    @POST("carrito/agregar")
    suspend fun agregarAlCarrito(
        @Body request: AddToCartRequest
    ): Response<Unit>

    @GET("carrito")
    suspend fun obtenerCarrito(): Response<CarritoResponse>


    @DELETE("carrito/detalle/{detalleId}")
    suspend fun eliminarProductoCarrito(
        @Path("detalleId") detalleId: Int
    ): Response<Unit>

    @GET("pedidos/mis-pedidos")
    suspend fun getMisPedidos(): Response<List<Pedido>>

    @POST("pedidos")
    suspend fun crearPedido(): Response<Pedido>

    @POST("pedidos")
    suspend fun crearPedido(
        @Body request: CrearPedidoRequest
    ): Response<Pedido>
}