package com.example.foodapp.presentacion.ProductDetail

import com.example.foodapp.data.model.Producto

data class ProductDetailState(

    val producto: Producto? = null,

    val isLoading: Boolean = false,

    val error: String? = null

)