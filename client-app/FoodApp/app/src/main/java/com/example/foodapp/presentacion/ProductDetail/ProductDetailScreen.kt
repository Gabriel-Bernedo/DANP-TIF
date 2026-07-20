package com.example.foodapp.presentacion.ProductDetail

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import coil.compose.AsyncImage

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProductDetailScreen(
    productId: String,
    navController: NavController,
    viewModel: ProductDetailViewModel = hiltViewModel()
) {

    val uiState by viewModel.uiState.collectAsState()
    val producto = uiState.producto

    LaunchedEffect(Unit) {
        viewModel.obtenerProducto(productId.toInt())
    }

    Scaffold(

        topBar = {

            TopAppBar(

                title = {
                    Text("Detalle del producto")
                },

                navigationIcon = {

                    IconButton(
                        onClick = {
                            navController.popBackStack()
                        }
                    ) {

                        Icon(
                            imageVector = Icons.Default.ArrowBack,
                            contentDescription = "Volver"
                        )

                    }

                }

            )

        }

    ) { padding ->

        when {

            uiState.isLoading -> {

                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {

                    CircularProgressIndicator()

                }

            }

            uiState.error != null -> {

                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {

                    Text(
                        text = uiState.error ?: "Ocurrió un error"
                    )

                }

            }

            producto == null -> {

                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {

                    Text(
                        text = "Producto no encontrado"
                    )

                }

            }

            else -> {

                Column(

                    modifier = Modifier
                        .padding(padding)
                        .fillMaxSize()
                        .padding(16.dp)

                ) {

                    AsyncImage(

                        model = producto.imagen_url,

                        contentDescription = producto.nombre,

                        modifier = Modifier
                            .fillMaxWidth()
                            .height(250.dp),

                        contentScale = ContentScale.Crop

                    )

                    Spacer(
                        modifier = Modifier.height(20.dp)
                    )

                    Text(

                        text = producto.nombre,

                        style = MaterialTheme.typography.headlineMedium

                    )

                    Spacer(
                        modifier = Modifier.height(12.dp)
                    )

                    Text(

                        text = "Categoría: ${producto.categorias.nombre}",

                        style = MaterialTheme.typography.titleMedium

                    )

                    Spacer(
                        modifier = Modifier.height(12.dp)
                    )

                    Text(

                        text = producto.descripcion,

                        style = MaterialTheme.typography.bodyLarge

                    )

                    Spacer(
                        modifier = Modifier.height(20.dp)
                    )

                    Text(

                        text = "Precio original: S/. ${producto.precio_original}",

                        style = MaterialTheme.typography.bodyLarge

                    )

                    Text(

                        text = "Precio oferta: S/. ${producto.precio_descuento}",

                        style = MaterialTheme.typography.headlineSmall

                    )

                    Spacer(
                        modifier = Modifier.height(16.dp)
                    )

                    Text(

                        text = "Disponibles: ${producto.cantidad_disponible}",

                        style = MaterialTheme.typography.bodyLarge

                    )

                    Spacer(
                        modifier = Modifier.weight(1f)
                    )

                    Button(

                        onClick = {

                            // Aquí agregaremos el carrito

                        },

                        modifier = Modifier
                            .fillMaxWidth()
                            .height(55.dp),

                        shape = RoundedCornerShape(16.dp)

                    ) {

                        Text(
                            text = "Agregar al carrito"
                        )

                    }

                }

            }

        }

    }

}