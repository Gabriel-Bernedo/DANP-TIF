package com.example.foodapp.network

import com.example.foodapp.data.model.LoginRequest
import com.example.foodapp.data.model.LoginResponse
import com.example.foodapp.data.model.RegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {

    @POST("auth/login")
    suspend fun login(
        @Body request: LoginRequest
    ): Response<LoginResponse>

    @POST("usuarios/registro")
    suspend fun register(
        @Body request: RegisterRequest
    ): Response<Unit>
}