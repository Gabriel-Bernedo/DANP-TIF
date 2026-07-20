package com.example.foodapp.data.model

data class RegisterRequest(
    val nombre: String,
    val apellido: String,
    val email: String,
    val password: String,
    val telefono: String?,
    val direccion: String?
)