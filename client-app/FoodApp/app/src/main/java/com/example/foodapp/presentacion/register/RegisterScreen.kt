package com.example.foodapp.presentacion.register

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.foodapp.navigation.Routes
import com.example.foodapp.presentacion.components.CustomTextField
import com.example.foodapp.presentacion.components.PasswordTextField
import com.example.foodapp.presentacion.components.PrimaryButton
import android.widget.Toast

@Composable
fun RegisterScreen(
    navController: NavController,
    viewModel: RegisterViewModel = hiltViewModel()
) {

    var nombre by remember { mutableStateOf("") }
    var apellido by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var telefono by remember { mutableStateOf("") }
    var direccion by remember { mutableStateOf("") }

    val registerSuccess by viewModel.registerSuccess.collectAsState()
    val error by viewModel.error.collectAsState()

    LaunchedEffect(registerSuccess) {
        if (registerSuccess) {

            Toast.makeText(
                navController.context,
                "Usuario registrado correctamente",
                Toast.LENGTH_SHORT
            ).show()

            navController.navigate(Routes.Login.route) {
                popUpTo(Routes.Register.route) {
                    inclusive = true
                }
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
        verticalArrangement = Arrangement.Center
    ) {

        Text(
            text = "Crear Cuenta",
            style = MaterialTheme.typography.headlineMedium
        )

        Spacer(modifier = Modifier.height(20.dp))

        CustomTextField(
            value = nombre,
            onValueChange = { nombre = it },
            label = "Nombre"
        )

        CustomTextField(
            value = apellido,
            onValueChange = { apellido = it },
            label = "Apellido"
        )

        CustomTextField(
            value = email,
            onValueChange = { email = it },
            label = "Correo"
        )

        PasswordTextField(
            value = password,
            onValueChange = { password = it }
        )

        CustomTextField(
            value = telefono,
            onValueChange = { telefono = it },
            label = "Teléfono (Opcional)"
        )

        CustomTextField(
            value = direccion,
            onValueChange = { direccion = it },
            label = "Dirección (Opcional)"
        )

        Spacer(modifier = Modifier.height(16.dp))

        PrimaryButton(
            text = "Registrarse"
        ) {
            viewModel.register(
                nombre,
                apellido,
                email,
                password,
                telefono,
                direccion
            )
        }

        if (error != null) {
            Spacer(modifier = Modifier.height(10.dp))

            Text(
                text = error!!,
                color = MaterialTheme.colorScheme.error
            )
        }
    }
}