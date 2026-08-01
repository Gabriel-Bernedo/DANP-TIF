package com.example.foodapp.presentacion.profile

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
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
fun ProfileScreen(
    navController: NavController,
    viewModel: ProfileViewModel = hiltViewModel()
) {


    val usuario by viewModel.usuario.collectAsState()
    val pedidos by viewModel.pedidos.collectAsState()

    Scaffold(

        topBar = {

            TopAppBar(

                title = {

                    Text(
                        text = "Mi Perfil"
                    )

                }

            )

        }

    ) { padding ->



        Column(

            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),

            horizontalAlignment = Alignment.CenterHorizontally

        ){



            if(usuario == null){


                CircularProgressIndicator()



            }else{



                // Foto de perfil

                Surface(

                    modifier = Modifier.size(100.dp),

                    shape = CircleShape,

                    color = MaterialTheme.colorScheme.primaryContainer

                ){

                    Box(

                        contentAlignment = Alignment.Center

                    ){

                        Text(

                            text = "👤",

                            fontSize = 50.sp

                        )

                    }


                }



                Spacer(

                    modifier = Modifier.height(16.dp)

                )



                Text(

                    text = "${usuario!!.nombre} ${usuario!!.apellido}",

                    style = MaterialTheme.typography.headlineSmall

                )



                Text(

                    text = usuario!!.email,

                    style = MaterialTheme.typography.bodyMedium

                )



                Spacer(

                    modifier = Modifier.height(24.dp)

                )




                Card(

                    modifier = Modifier.fillMaxWidth(),

                    shape = RoundedCornerShape(20.dp)

                ){


                    Column(

                        modifier = Modifier.padding(16.dp)

                    ){



                        Text(

                            text = "Información personal",

                            style = MaterialTheme.typography.titleMedium

                        )



                        Spacer(

                            modifier = Modifier.height(12.dp)

                        )



                        Text(
                            text = "🆔 ID: ${usuario!!.id}"
                        )


                        Text(
                            text = "📧 Correo: ${usuario!!.email}"
                        )


                        Text(
                            text = "👤 Rol: ${usuario!!.role}"
                        )



                    }



                }
                Spacer(
                    modifier = Modifier.height(24.dp)
                )


                Text(
                    text = "📦 Mis pedidos recientes",
                    style = MaterialTheme.typography.titleLarge
                )


                Spacer(
                    modifier = Modifier.height(12.dp)
                )

                pedidos.take(3).forEach { pedido ->


                    Card(

                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 6.dp),

                        shape = RoundedCornerShape(16.dp)

                    ){


                        Column(

                            modifier = Modifier.padding(16.dp)

                        ){


                            Text(
                                text = "Pedido #${pedido.id}",
                                style = MaterialTheme.typography.titleMedium
                            )


                            Text(
                                text = "Fecha: ${pedido.fecha_pedido}"
                            )


                            Text(
                                text = "Estado: ${pedido.estado}"
                            )


                            Text(
                                text = "Total: S/ ${pedido.total}"
                            )


                        }


                    }


                }



            }



        }



    }


}