package com.example.foodapp.presentation.home

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@Composable
fun HomeScreen(
    navController: NavController
) {

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {

        item {
            Text(
                text = "FoodApp",
                style = MaterialTheme.typography.headlineMedium
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = "¡Hola!",
                style = MaterialTheme.typography.titleMedium
            )

            Spacer(modifier = Modifier.height(20.dp))

            OutlinedTextField(
                value = "",
                onValueChange = {},
                modifier = Modifier.fillMaxWidth(),
                placeholder = {
                    Text("Buscar alimentos...")
                }
            )

            Spacer(modifier = Modifier.height(20.dp))

            Text(
                text = "Ofertas Especiales",
                style = MaterialTheme.typography.titleLarge
            )

            Spacer(modifier = Modifier.height(10.dp))
        }

        items(5) {

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
            ) {

                Column(
                    modifier = Modifier.padding(16.dp)
                ) {

                    Text("Pan Integral")

                    Spacer(modifier = Modifier.height(6.dp))

                    Text("S/. 3.50")

                    Spacer(modifier = Modifier.height(6.dp))

                    Text("Vence mañana")

                }

            }

        }

    }

}