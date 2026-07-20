package com.example.foodapp.presentacion.home

import com.example.foodapp.data.model.Producto

data class HomeState(
    val productos: List<Producto> = emptyList(),
    val productosFiltrados: List<Producto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null,
    val busqueda: String = ""
)