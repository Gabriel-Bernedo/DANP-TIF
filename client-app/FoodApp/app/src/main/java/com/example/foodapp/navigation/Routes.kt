package com.example.foodapp.navigation

sealed class Routes(val route: String) {

    object Login : Routes("login")

    object Register : Routes("register")

    object Home : Routes("home")

    object Productos : Routes("productos")

    object Carrito : Routes("carrito")

    object Pedidos : Routes("pedidos")

    object Ofertas : Routes("ofertas")

    object Profile : Routes("profile")

    object ProductDetail : Routes("product_detail/{productId}")

}