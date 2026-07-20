package com.example.foodapp.presentation.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Receipt
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import com.example.foodapp.navigation.Routes

@Composable
fun BottomBar(
    navController: NavHostController
) {

    NavigationBar {

        NavigationBarItem(
            selected = false,
            onClick = {
                navController.navigate(Routes.Home.route)
            },
            icon = {
                Icon(Icons.Default.Home, null)
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
                Icon(Icons.Default.ShoppingCart, null)
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
                Icon(Icons.Default.Receipt, null)
            },
            label = {
                Text("Pedidos")
            }
        )

        NavigationBarItem(
            selected = false,
            onClick = {
                navController.navigate(Routes.Profile.route)
            },
            icon = {
                Icon(Icons.Default.Person, null)
            },
            label = {
                Text("Perfil")
            }
        )

    }

}