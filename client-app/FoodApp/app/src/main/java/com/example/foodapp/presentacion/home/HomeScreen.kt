package com.example.foodapp.presentacion.home

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.foodapp.presentacion.components.CategoryItem
import com.example.foodapp.presentacion.components.FoodSearchBar
import com.example.foodapp.presentacion.components.OfferBanner
import com.example.foodapp.presentacion.components.ProductCard
import kotlinx.coroutines.launch


@Composable
fun HomeScreen(

    navController: NavController,

    viewModel: HomeViewModel = hiltViewModel()

) {


    val uiState by viewModel.uiState.collectAsState()

    val snackbarHostState = remember {
        SnackbarHostState()
    }
    val scope = rememberCoroutineScope()

    Scaffold(
        snackbarHost = {
            SnackbarHost(
                hostState = snackbarHostState
            )
        }

    ){ padding ->

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),

            verticalArrangement = Arrangement.spacedBy(16.dp)

        ){

            // HEADER

            item {
                HomeHeader(
                    onCartClick = {
                        navController.navigate("cart")

                    }

                )

            }

            // BUSCADOR

            item {

                FoodSearchBar(

                    value = uiState.busqueda,


                    onValueChange = {

                        viewModel.buscarProducto(it)

                    }

                )

            }

            // BANNER OFERTA

            item {
                OfferBanner(
                    onClick = {
                        viewModel.filtrarOfertas()
                    }

                )


            }

            // CATEGORIAS

            item {

                Text(

                    text = "Categorías",

                    style = MaterialTheme.typography.titleLarge

                )


            }

            item {

                LazyRow(

                    horizontalArrangement = Arrangement.spacedBy(12.dp)

                ){

                    item {

                        CategoryItem(

                            texto = "Todas",

                            onClick = {

                                viewModel.mostrarTodos()
                            }
                        )

                    }

                    items(uiState.categorias){ categoria ->
                        CategoryItem(
                            texto = categoria.nombre,
                            onClick = {
                                viewModel.filtrarCategoria(
                                    categoria.id

                                )
                            }
                        )
                    }
                }

            }

            // PRODUCTOS TITULO

            item {
                Text(
                    text = "Productos disponibles",
                    style = MaterialTheme.typography.titleLarge
                )
            }

            // PRODUCTOS

            if(uiState.isLoading){
                item {
                    Text(
                        text = "Cargando productos..."

                    )
                }

            }


            else if(uiState.error != null){
                item {
                    Text(
                        text = uiState.error ?: ""
                    )
                }
            }

            else {

                items(uiState.productos){ producto ->
                    ProductCard(
                        producto = producto,
                        onClick = {
                            navController.navigate(
                                "product_detail/${producto.id}"

                            )
                        },
                        onAgregarCarrito = { productoId, cantidad ->

                            scope.launch {

                                val agregado = viewModel.agregarAlCarrito(
                                    productoId,
                                    cantidad
                                )

                                if (agregado) {
                                    snackbarHostState.showSnackbar(
                                        "✅ Producto agregado al carrito"
                                    )
                                } else {

                                    snackbarHostState.showSnackbar(
                                        "❌ Error al agregar producto"
                                    )
                                }
                            }
                        }
                    )
                }
            }

        }
    }
}

@Composable
fun HomeHeader(
    onCartClick: () -> Unit
){

    Row(

        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 16.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically

    ){

        Column {
            Text(
                text = "Hola 👋",
                style = MaterialTheme.typography.bodyLarge
            )


            Text(
                text = "¿Qué quieres salvar hoy?",
                style = MaterialTheme.typography.headlineSmall
            )
        }


        IconButton(
            onClick = onCartClick
        ){

            Icon(
                imageVector = Icons.Default.ShoppingCart,
                contentDescription = "Carrito"

            )
        }

    }

}