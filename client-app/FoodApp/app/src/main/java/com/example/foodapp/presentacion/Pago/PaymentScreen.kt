package com.example.foodapp.presentacion.Pago

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.selection.selectable
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController

@Composable
fun PaymentScreen(
    navController: NavController,
    viewModel: PaymentViewModel = hiltViewModel()
) {

    var metodoPago by remember {
        mutableStateOf("Tarjeta")
    }

    var numeroTarjeta by remember {
        mutableStateOf("")
    }

    var titular by remember {
        mutableStateOf("")
    }

    var fecha by remember {
        mutableStateOf("")
    }

    var cvv by remember {
        mutableStateOf("")
    }

    var direccion by remember {
        mutableStateOf("")
    }
    val isLoading by viewModel.isLoading.collectAsState()
    val pedidoCreado by viewModel.pedidoCreado.collectAsState()
    val error by viewModel.error.collectAsState()

    LaunchedEffect(pedidoCreado) {

        if (pedidoCreado) {

            navController.navigate("pedidos") {

                popUpTo("payment") {
                    inclusive = true
                }

            }

        }

    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Top
    ) {

        Text(
            text = "Pago",
            style = MaterialTheme.typography.headlineMedium
        )

        Spacer(modifier = Modifier.height(20.dp))

        Text(
            text = "Selecciona un método de pago",
            style = MaterialTheme.typography.titleMedium
        )

        Spacer(modifier = Modifier.height(15.dp))

        listOf(
            "Tarjeta",
            "Yape",
            "Contra entrega"
        ).forEach { metodo ->

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .selectable(
                        selected = metodoPago == metodo,
                        onClick = {
                            metodoPago = metodo
                        }
                    ),
                elevation = CardDefaults.cardElevation(3.dp)
            ) {

                androidx.compose.foundation.layout.Row(
                    modifier = Modifier.padding(12.dp)
                ) {

                    RadioButton(
                        selected = metodoPago == metodo,
                        onClick = {
                            metodoPago = metodo
                        }
                    )

                    Text(
                        text = metodo,
                        modifier = Modifier.padding(start = 8.dp)
                    )

                }

            }

        }

        Spacer(modifier = Modifier.height(20.dp))

        OutlinedTextField(
            value = direccion,
            onValueChange = {
                direccion = it
            },
            label = {
                Text("Dirección de entrega")
            },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(20.dp))

        when(metodoPago){

            "Tarjeta" -> {

                OutlinedTextField(
                    value = numeroTarjeta,
                    onValueChange = {
                        numeroTarjeta = it
                    },
                    label = {
                        Text("Número de tarjeta")
                    },
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(10.dp))

                OutlinedTextField(
                    value = titular,
                    onValueChange = {
                        titular = it
                    },
                    label = {
                        Text("Titular")
                    },
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(10.dp))

                OutlinedTextField(
                    value = fecha,
                    onValueChange = {
                        fecha = it
                    },
                    label = {
                        Text("MM/AA")
                    },
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(10.dp))

                OutlinedTextField(
                    value = cvv,
                    onValueChange = {
                        cvv = it
                    },
                    label = {
                        Text("CVV")
                    },
                    modifier = Modifier.fillMaxWidth()
                )

            }

            "Yape" -> {

                Text(
                    text = "Número Yape:"
                )

                Text(
                    text = "999 888 777",
                    style = MaterialTheme.typography.headlineSmall
                )

                Spacer(modifier = Modifier.height(15.dp))

                Text(
                    text = "Escanea el QR (se agregará después)."
                )

            }

            "Contra entrega" -> {

                Text(
                    text = "El pago se realizará cuando recibas el pedido."
                )

            }

        }

        Spacer(modifier = Modifier.weight(1f))

        Button(
            onClick = {

                viewModel.crearPedido(
                    direccion = direccion,
                    metodoPago = metodoPago.lowercase()
                )
            },
            modifier = Modifier.fillMaxWidth()
        ) {

            if (isLoading) {

                CircularProgressIndicator()

            } else {

                Text("Confirmar compra")

            }

        }

    }

}