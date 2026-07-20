package com.example.foodapp.presentacion.login

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.foodapp.navigation.Routes
import com.example.foodapp.presentacion.components.CustomTextField
import com.example.foodapp.presentacion.components.PasswordTextField
import com.example.foodapp.presentacion.components.PrimaryButton

@Composable
fun LoginScreen(
    navController: NavController
) {

    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 24.dp)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {

        Text(
            text = "FoodApp",
            style = MaterialTheme.typography.headlineLarge,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Reduce el desperdicio de alimentos",
            style = MaterialTheme.typography.bodyMedium
        )

        Spacer(modifier = Modifier.height(40.dp))

        CustomTextField(
            value = email,
            onValueChange = { email = it },
            label = "Correo electrónico"
        )

        PasswordTextField(
            value = password,
            onValueChange = { password = it }
        )

        Spacer(modifier = Modifier.height(20.dp))

        PrimaryButton(
            text = "Iniciar sesión",
            onClick = {
                // Luego aquí llamaremos al ViewModel
            }
        )

        Spacer(modifier = Modifier.height(24.dp))

        Row {

            Text("¿No tienes cuenta? ")

            Text(
                text = "Regístrate",
                color = MaterialTheme.colorScheme.primary,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.clickable {
                    navController.navigate(Routes.Register.route)
                }
            )

        }

    }
}