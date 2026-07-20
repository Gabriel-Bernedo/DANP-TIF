package com.example.foodapp.data.model

data class LoginResponse(
    val access_token: String,
    val usuario: UsuarioLogin
)

data class UsuarioLogin(
    val id: Int,
    val nombre: String,
    val apellido: String,
    val email: String,
    val role: String
)