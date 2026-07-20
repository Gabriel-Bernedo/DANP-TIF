package com.example.foodapp.data.repository

import com.example.foodapp.data.model.LoginRequest
import com.example.foodapp.data.model.LoginResponse
import com.example.foodapp.data.model.RegisterRequest
import com.example.foodapp.domain.repository.AuthRepository
import com.example.foodapp.network.ApiService
import retrofit2.Response
import javax.inject.Inject

class AuthRepositoryImpl @Inject constructor(
    private val api: ApiService
) : AuthRepository {

    override suspend fun login(
        request: LoginRequest
    ): Response<LoginResponse> {

        return api.login(request)

    }

    override suspend fun register(
        request: RegisterRequest
    ): Response<Unit> {

        return api.register(request)

    }
}