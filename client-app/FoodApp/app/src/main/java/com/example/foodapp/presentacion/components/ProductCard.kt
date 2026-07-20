package com.example.foodapp.presentacion.components

import androidx.compose.foundation.layout.*
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.foodapp.data.model.Producto


@Composable
fun ProductCard(
    producto: Producto
) {

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
    ) {

        Column(
            modifier = Modifier.padding(16.dp)
        ) {


            AsyncImage(
                model = producto.imagen_url,
                contentDescription = producto.nombre,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp),
                contentScale = ContentScale.Crop
            )


            Spacer(
                modifier = Modifier.height(10.dp)
            )


            Text(
                text = producto.nombre
            )


            Spacer(
                modifier = Modifier.height(8.dp)
            )


            Text(
                text = producto.descripcion
            )


            Spacer(
                modifier = Modifier.height(8.dp)
            )


            Text(
                text = "Antes: S/ ${producto.precio_original}"
            )


            Text(
                text = "Oferta: S/ ${producto.precio_descuento}"
            )


            Text(
                text = "Disponible: ${producto.cantidad_disponible}"
            )

        }

    }

}