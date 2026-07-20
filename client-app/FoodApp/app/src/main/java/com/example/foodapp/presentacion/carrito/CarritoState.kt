package com.example.foodapp.presentacion.carrito

import com.example.foodapp.data.model.CarritoResponse


data class CarritoState(

    val carrito: CarritoResponse? = null,

    val isLoading: Boolean = false,

    val error: String? = null

)