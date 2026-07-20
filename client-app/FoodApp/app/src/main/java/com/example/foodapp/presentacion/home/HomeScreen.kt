package com.example.foodapp.presentacion.home

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.foodapp.presentacion.components.ProductCard
import com.example.foodapp.presentacion.home.HomeViewModel


@Composable
fun HomeScreen(
    navController: NavController,
    viewModel: HomeViewModel = hiltViewModel()
) {


    val uiState by viewModel.uiState.collectAsState()


    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {


        // HEADER
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {


            Column {

                Text(
                    text = "Encuentra comida cerca",
                    style = MaterialTheme.typography.titleMedium
                )


                Text(
                    text = "📍 Ver en el mapa",
                    style = MaterialTheme.typography.bodyMedium
                )

            }


            IconButton(
                onClick = {}
            ) {

                Icon(
                    imageVector = Icons.Default.ShoppingCart,
                    contentDescription = "Carrito"
                )

            }

        }



        Spacer(
            modifier = Modifier.height(20.dp)
        )



        // BUSCADOR

        OutlinedTextField(
            value = uiState.busqueda,
            onValueChange = {
                viewModel.buscarProducto(it)
            },
            modifier = Modifier
                .fillMaxWidth(),
            placeholder = {
                Text(
                    text = "Busca lo que quieras"
                )
            },
            leadingIcon = {

                Icon(
                    imageVector = Icons.Default.Search,
                    contentDescription = null
                )

            },
            shape = RoundedCornerShape(30.dp)
        )



        Spacer(
            modifier = Modifier.height(20.dp)
        )



        // CATEGORIAS

        Text(
            text = "Categorías",
            style = MaterialTheme.typography.titleLarge
        )


        Spacer(
            modifier = Modifier.height(10.dp)
        )


        Row(
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {


            CategoriaItem("🍰\nPostres")

            CategoriaItem("🍕\nComida")

            CategoriaItem("🥗\nSaludable")

        }



        Spacer(
            modifier = Modifier.height(25.dp)
        )



        // PRODUCTOS

        Text(
            text = "Productos disponibles",
            style = MaterialTheme.typography.titleLarge
        )



        Spacer(
            modifier = Modifier.height(10.dp)
        )



        when {


            uiState.isLoading -> {

                Text(
                    text = "Cargando productos..."
                )

            }


            uiState.error != null -> {

                Text(
                    text = uiState.error ?: ""
                )

            }


            else -> {


                LazyColumn {

                    items(uiState.productos) { producto ->

                        ProductCard(
                            producto = producto,
                            onClick = {

                                navController.navigate(
                                    "product_detail/${producto.id}"
                                )

                            }
                        )

                    }

                }


            }


        }


    }


}



@Composable
fun CategoriaItem(
    texto: String
){

    Box(

        modifier = Modifier
            .size(90.dp)
            .clip(RoundedCornerShape(16.dp))
            .background(
                MaterialTheme.colorScheme.surfaceVariant
            ),

        contentAlignment = Alignment.Center

    ){

        Text(
            text = texto
        )

    }

}