package com.example.foodapp.presentacion.carrito

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.foodapp.presentacion.pedidos.PedidoViewModel


@Composable
fun CarritoScreen(
    viewModel: CarritoViewModel = hiltViewModel(),
    pedidoViewModel: PedidoViewModel = hiltViewModel()
) {


    val uiState by viewModel.uiState.collectAsState()



    Column(

        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)

    ){


        Text(

            text = "Mi carrito",

            style = MaterialTheme.typography.headlineMedium

        )


        Spacer(
            modifier = Modifier.height(20.dp)
        )



        when {


            uiState.isLoading -> {


                CircularProgressIndicator()


            }



            uiState.error != null -> {


                Text(
                    text = uiState.error ?: ""
                )


            }



            uiState.carrito == null -> {


                Text(
                    text = "El carrito está vacío"
                )


            }



            else -> {
                if(
                    uiState.carrito?.carrito_detalle.isNullOrEmpty()
                ){

                    Text(
                        text = "Tu carrito está vacío"
                    )

                }else{

                    LazyColumn {

                        items(
                            uiState.carrito?.carrito_detalle ?: emptyList()
                        ){

                        }

                    }

                }



                LazyColumn {

                    items(
                        uiState.carrito?.carrito_detalle ?: emptyList()
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
                    modifier = Modifier.height(20.dp)
                )


                Button(

                    onClick = {

                        pedidoViewModel.crearPedido()

                    },

                    modifier = Modifier
                        .fillMaxWidth()

                ){

                    Text(
                        text = "Realizar pedido"
                    )

                }



            }



        }



    }



}