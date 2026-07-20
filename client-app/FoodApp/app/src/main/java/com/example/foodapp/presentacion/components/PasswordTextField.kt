package com.example.foodapp.presentacion.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp

@Composable
fun PasswordTextField(
    value: String,
    onValueChange: (String) -> Unit
) {

    var visible by remember {
        mutableStateOf(false)
    }

    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        label = {
            Text("Contraseña")
        },
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        singleLine = true,
        visualTransformation =
            if (visible)
                VisualTransformation.None
            else
                PasswordVisualTransformation(),

        trailingIcon = {

            IconButton(
                onClick = {
                    visible = !visible
                }
            ) {

                Icon(
                    imageVector =
                        if (visible)
                            Icons.Default.Visibility
                        else
                            Icons.Default.VisibilityOff,
                    contentDescription = null
                )

            }

        }

    )

}