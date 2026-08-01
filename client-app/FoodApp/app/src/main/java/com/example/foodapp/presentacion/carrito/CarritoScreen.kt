package com.example.foodapp.presentacion.carrito

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.foodapp.navigation.Routes
import com.example.foodapp.presentacion.pedidos.PedidoViewModel
import androidx.compose.material3.TopAppBar


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CarritoScreen(
    navController: NavController,
    viewModel: CarritoViewModel = hiltViewModel(),
    pedidoViewModel: PedidoViewModel = hiltViewModel()
) {

    val uiState by viewModel.uiState.collectAsState()
    val total = uiState.carrito?.carrito_detalle?.sumOf { detalle ->

        detalle.precio_unitario.toDouble() * detalle.cantidad

    } ?: 0.0


    Scaffold(

        topBar = {

            TopAppBar(

                title = {

                    Text(
                        text = "🛒 Mi carrito",
                        style = MaterialTheme.typography.titleLarge
                    )

                }

            )

        }

    ) { padding ->


        Column(

            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp)

        ) {


            when {


                uiState.isLoading -> {


                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ){

                        CircularProgressIndicator()

                    }


                }



                uiState.error != null -> {


                    Text(
                        text = uiState.error ?: "",
                        color = MaterialTheme.colorScheme.error
                    )


                }



                uiState.carrito == null ||
                        uiState.carrito?.carrito_detalle.isNullOrEmpty() -> {


                    Box(

                        modifier = Modifier.fillMaxSize(),

                        contentAlignment = Alignment.Center

                    ){

                        Column(

                            horizontalAlignment = Alignment.CenterHorizontally

                        ){

                            Text(
                                text = "🛒",
                                fontSize = 60.sp
                            )


                            Spacer(
                                modifier = Modifier.height(12.dp)
                            )


                            Text(
                                text = "Tu carrito está vacío",
                                style = MaterialTheme.typography.titleMedium
                            )


                            Text(
                                text = "Agrega productos para continuar"
                            )


                        }


                    }



                }



                else -> {


                    LazyColumn(

                        modifier = Modifier.weight(1f),

                        verticalArrangement = Arrangement.spacedBy(12.dp)

                    ){


                        items(

                            uiState.carrito?.carrito_detalle
                                ?: emptyList()

                        ){ detalle ->



                            ProductoCarritoItem(

                                detalle = detalle,


                                onDelete = {


                                    viewModel.eliminarProducto(
                                        detalle.id
                                    )


                                }

                            )



                        }



                    }



                    Spacer(
                        modifier = Modifier.height(16.dp)
                    )



                    Card(

                        modifier = Modifier.fillMaxWidth(),

                        elevation = CardDefaults.cardElevation(
                            6.dp
                        )

                    ){


                        Column(

                            modifier = Modifier.padding(16.dp)

                        ){


                            Text(

                                text = "Resumen de compra",

                                style = MaterialTheme.typography.titleMedium

                            )


                            Spacer(
                                modifier = Modifier.height(8.dp)
                            )


                            Text(
                                text = "Total: S/ %.2f".format(total),
                                style = MaterialTheme.typography.headlineSmall
                            )


                            Spacer(
                                modifier = Modifier.height(12.dp)
                            )



                            Button(

                                modifier = Modifier
                                    .fillMaxWidth(),

                                onClick = {


                                    navController.navigate(
                                        Routes.Payment.route
                                    )


                                }

                            ){

                                Text(
                                    text = "Realizar pedido"
                                )

                            }



                        }



                    }



                }



            }


        }


    }

}