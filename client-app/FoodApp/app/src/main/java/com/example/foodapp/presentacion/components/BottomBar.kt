package com.example.foodapp.presentacion.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.Receipt
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.navigation.NavController
import com.example.foodapp.navigation.Routes

@Composable
fun BottomBar(
    navController: NavController
) {

    NavigationBar {

        NavigationBarItem(
            selected = false,
            onClick = {
                navController.navigate(Routes.Home.route)
            },
            icon = {
                Icon(Icons.Default.Home, contentDescription = "Inicio")
            },
            label = {
                Text("Inicio")
            }
        )

        NavigationBarItem(
            selected = false,
            onClick = {
                navController.navigate(Routes.Carrito.route)
            },
            icon = {
                Icon(Icons.Default.ShoppingCart, contentDescription = "Carrito")
            },
            label = {
                Text("Carrito")
            }
        )

        NavigationBarItem(
            selected = false,
            onClick = {
                navController.navigate(Routes.Pedidos.route)
            },
            icon = {
                Icon(Icons.Default.Receipt, contentDescription = "Pedidos")
            },
            label = {
                Text("Pedidos")
            }
        )

        NavigationBarItem(
            selected = false,
            onClick = {

            },
            icon = {
                Icon(Icons.Default.Person, contentDescription = "Perfil")
            },
            label = {
                Text("Perfil")
            }
        )

    }

}