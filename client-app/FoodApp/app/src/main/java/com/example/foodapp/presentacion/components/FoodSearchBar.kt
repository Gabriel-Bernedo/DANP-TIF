package com.example.foodapp.presentacion.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp



@Composable
fun FoodSearchBar(

    value: String,

    onValueChange: (String) -> Unit

) {


    OutlinedTextField(

        value = value,


        onValueChange = onValueChange,


        modifier = Modifier
            .fillMaxWidth(),


        placeholder = {

            Text(
                text = "Buscar comida..."
            )

        },


        leadingIcon = {


            Icon(

                imageVector = Icons.Default.Search,

                contentDescription = "Buscar"

            )


        },


        singleLine = true,


        shape = RoundedCornerShape(50.dp),


        colors = OutlinedTextFieldDefaults.colors(

            focusedBorderColor = MaterialTheme.colorScheme.primary,

            unfocusedBorderColor = MaterialTheme.colorScheme.outline

        )


    )

}