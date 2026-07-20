package com.example.foodapp.domain.repository

import com.example.foodapp.data.model.LoginRequest
import com.example.foodapp.data.model.LoginResponse
import com.example.foodapp.data.model.RegisterRequest
import retrofit2.Response

interface AuthRepository {

    suspend fun login(
        request: LoginRequest
    ): Response<LoginResponse>

    suspend fun register(
        request: RegisterRequest
    ): Response<Unit>

}