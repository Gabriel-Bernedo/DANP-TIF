package com.example.foodapp.presentacion.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp



@Composable
fun CategoryItem(

    texto: String,

    onClick: () -> Unit

) {


    Card(

        modifier = Modifier

            .size(100.dp)

            .clickable {

                onClick()

            },


        shape = RoundedCornerShape(20.dp),


        colors = CardDefaults.cardColors(

            containerColor = MaterialTheme.colorScheme.surfaceVariant

        )


    ) {



        Column(

            modifier = Modifier.fillMaxSize(),

            horizontalAlignment = Alignment.CenterHorizontally,

            verticalArrangement = Arrangement.Center

        ) {



            Text(

                text = getCategoryEmoji(texto),

                fontSize = MaterialTheme.typography.headlineSmall.fontSize

            )



            Spacer(

                modifier = Modifier.height(6.dp)

            )



            Text(

                text = texto,

                style = MaterialTheme.typography.bodyMedium

            )


        }



    }


}



private fun getCategoryEmoji(

    categoria:String

):String{


    return when(categoria.lowercase()){

        "postres" -> "🍰"

        "bebidas" -> "🥤"

        "comida" -> "🍔"

        "panadería" -> "🥖"

        else -> "🍽️"

    }


}