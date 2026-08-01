package com.example.foodapp.presentacion.pedidos

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController



@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PedidosScreen(
    navController: NavController,
    viewModel: PedidoViewModel = hiltViewModel()
) {


    val uiState by viewModel.uiState.collectAsState()



    Scaffold(

        topBar = {

            TopAppBar(

                title = {

                    Text(
                        text = "📦 Mis pedidos"
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

                        text = uiState.error ?: "Error",

                        color = MaterialTheme.colorScheme.error

                    )


                }




                uiState.pedidos.isEmpty() -> {


                    Box(

                        modifier = Modifier.fillMaxSize(),

                        contentAlignment = Alignment.Center

                    ){


                        Column(

                            horizontalAlignment = Alignment.CenterHorizontally

                        ){


                            Text(

                                text = "📦",

                                fontSize = 60.sp

                            )


                            Spacer(

                                modifier = Modifier.height(12.dp)

                            )


                            Text(

                                text = "No tienes pedidos todavía",

                                style = MaterialTheme.typography.titleMedium

                            )


                        }


                    }


                }




                else -> {


                    LazyColumn(

                        verticalArrangement = Arrangement.spacedBy(12.dp)

                    ){



                        items(uiState.pedidos){ pedido ->



                            PedidoCard(

                                pedido = pedido

                            )



                        }



                    }



                }



            }



        }



    }



}





@Composable
fun PedidoCard(

    pedido: com.example.foodapp.data.model.Pedido

){



    Card(

        modifier = Modifier
            .fillMaxWidth(),

        shape = RoundedCornerShape(20.dp),

        elevation = CardDefaults.cardElevation(
            defaultElevation = 5.dp
        )

    ){



        Column(

            modifier = Modifier
                .padding(16.dp)

        ){



            Text(

                text = "Pedido #${pedido.id}",

                style = MaterialTheme.typography.titleLarge

            )



            Spacer(

                modifier = Modifier.height(8.dp)

            )



            Text(

                text = "Estado: ${pedido.estado}"

            )



            Text(

                text = "Pago: ${pedido.metodo_pago}"

            )



            Text(

                text = "Dirección: ${pedido.direccion_entrega}"

            )



            Spacer(

                modifier = Modifier.height(12.dp)

            )



            HorizontalDivider()



            Spacer(

                modifier = Modifier.height(12.dp)

            )



            Text(

                text = "Productos",

                style = MaterialTheme.typography.titleMedium

            )



            Spacer(

                modifier = Modifier.height(8.dp)

            )



            pedido.pedido_detalle.forEach { detalle ->



                Row(

                    modifier = Modifier.fillMaxWidth(),

                    horizontalArrangement = Arrangement.SpaceBetween

                ){



                    Text(

                        text = "${detalle.productos.nombre} x${detalle.cantidad}"

                    )



                    Text(

                        text = "S/ ${detalle.subtotal}"

                    )



                }



                Spacer(

                    modifier = Modifier.height(4.dp)

                )



            }




            Spacer(

                modifier = Modifier.height(12.dp)

            )



            HorizontalDivider()



            Spacer(

                modifier = Modifier.height(8.dp)

            )



            Text(

                text = "Total: S/ ${pedido.total}",

                style = MaterialTheme.typography.titleLarge

            )



        }



    }



}