package com.example.foodapp.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.foodapp.presentacion.login.LoginScreen
import com.example.foodapp.presentacion.register.RegisterScreen
import com.example.foodapp.presentacion.carrito.CarritoScreen
import com.example.foodapp.presentacion.components.BottomBar
import com.example.foodapp.presentacion.home.HomeScreen
import com.example.foodapp.presentacion.ofertas.OfertasScreen
import com.example.foodapp.presentacion.pedidos.PedidosScreen
import com.example.foodapp.presentacion.profile.ProfileScreen
import com.example.foodapp.presentacion.ProductDetail.ProductDetailScreen

@Composable
fun AppNavigation() {

    val navController = rememberNavController()

    Scaffold(

        bottomBar = {
            BottomBar(navController)
        }

    ) { innerPadding ->

        NavHost(
            navController = navController,
            startDestination = Routes.Login.route,
            modifier = Modifier.padding(innerPadding)
        ) {

            composable(Routes.Home.route) {
                HomeScreen(navController)
            }

            composable(Routes.Carrito.route) {
                CarritoScreen(navController)
            }

            composable(Routes.Pedidos.route) {
                PedidosScreen(navController)
            }

            composable(Routes.Ofertas.route) {
                OfertasScreen(navController)
            }

            composable(Routes.Profile.route) {
                ProfileScreen(navController)
            }
            composable(Routes.Login.route) {
                LoginScreen(navController)
            }

            composable(Routes.Register.route) {
                RegisterScreen(navController)
            }

            composable(
                Routes.ProductDetail.route
            ) { backStackEntry ->


                val productId =
                    backStackEntry.arguments?.getString("productId")


                ProductDetailScreen(
                    productId = productId ?: "",
                    navController = navController
                )

            }
        }
    }
}