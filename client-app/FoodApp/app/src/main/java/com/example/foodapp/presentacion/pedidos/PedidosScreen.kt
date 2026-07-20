package com.example.foodapp.presentacion.pedidos

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController



@Composable
fun PedidosScreen(
    navController: NavController,
    viewModel: PedidoViewModel = hiltViewModel()
) {


    val uiState by viewModel.uiState.collectAsState()



    Column(

        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)

    ) {



        Text(

            text = "Mis pedidos",

            style = MaterialTheme.typography.headlineMedium

        )



        Spacer(
            modifier = Modifier.height(20.dp)
        )




        when {


            uiState.isLoading -> {


                Box(

                    modifier = Modifier.fillMaxSize()

                ){

                    CircularProgressIndicator()

                }


            }




            uiState.error != null -> {


                Text(

                    text = uiState.error ?: "Error"

                )


            }





            uiState.pedidos.isEmpty() -> {


                Text(

                    text = "No tienes pedidos todavía"

                )


            }




            else -> {


                LazyColumn {


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






@Composable
fun PedidoCard(

    pedido: com.example.foodapp.data.model.Pedido

){



    Card(

        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),

        shape = RoundedCornerShape(16.dp)

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
                modifier = Modifier.height(10.dp)
            )



            Text(

                text = "Productos:",

                style = MaterialTheme.typography.titleMedium

            )



            pedido.pedido_detalle.forEach { detalle ->



                Text(

                    text =
                        "- ${detalle.productos.nombre} x${detalle.cantidad}"

                )


                Text(

                    text =
                        "  Subtotal: S/ ${detalle.subtotal}"

                )



            }




            Spacer(
                modifier = Modifier.height(10.dp)
            )



            Text(

                text = "Total: S/ ${pedido.total}",

                style = MaterialTheme.typography.titleMedium

            )



        }



    }



}