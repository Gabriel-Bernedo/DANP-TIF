package com.example.foodapp.presentacion.components


import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.foodapp.ui.theme.FoodOrange
import com.example.foodapp.ui.theme.FoodWhite



@Composable
fun OfferBanner(

    onClick: () -> Unit = {}

) {


    Card(

        modifier = Modifier
            .fillMaxWidth()
            .height(160.dp),

        shape = RoundedCornerShape(24.dp),

        onClick = onClick,


        colors = CardDefaults.cardColors(

            containerColor = FoodOrange

        )


    ) {



        Column(

            modifier = Modifier
                .padding(20.dp)

        ) {



            Text(

                text = "🔥 Ofertas del día",

                color = FoodWhite,

                fontSize = 24.sp,

                style = MaterialTheme.typography.titleLarge

            )



            Spacer(

                modifier = Modifier.height(8.dp)

            )



            Text(

                text = "Hasta 50% de descuento\npara salvar alimentos",

                color = FoodWhite,

                fontSize = 16.sp

            )



            Spacer(

                modifier = Modifier.height(12.dp)

            )



            Text(

                text = "Ver productos →",

                color = FoodWhite,

                fontSize = 14.sp

            )


        }



    }


}