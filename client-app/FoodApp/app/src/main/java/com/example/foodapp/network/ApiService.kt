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


}