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
import androidx.compose.foundation.clickable
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue

@Composable
fun ProductCard(
    producto: Producto,
    onClick: () -> Unit,
    onAgregarCarrito: (Int, Int) -> Unit
) {

    var cantidad by remember {
        mutableIntStateOf(1)
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)
            .clickable {
                onClick()
            }
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

            Spacer(modifier = Modifier.height(10.dp))

            Text(producto.nombre)

            Spacer(modifier = Modifier.height(8.dp))

            Text(producto.descripcion)

            Spacer(modifier = Modifier.height(8.dp))

            Text("Antes: S/. ${producto.precio_original}")

            Text("Oferta: S/. ${producto.precio_descuento}")

            Text("Disponible: ${producto.cantidad_disponible}")

            Spacer(modifier = Modifier.height(12.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center
            ) {

                Button(
                    onClick = {

                        if (cantidad > 1) {
                            cantidad--
                        }

                    }
                ) {

                    Text("-")

                }

                Spacer(modifier = Modifier.width(16.dp))

                Text(
                    text = cantidad.toString(),
                    style = MaterialTheme.typography.titleLarge
                )

                Spacer(modifier = Modifier.width(16.dp))

                Button(
                    onClick = {

                        if (cantidad < producto.cantidad_disponible) {
                            cantidad++
                        }

                    }
                ) {

                    Text("+")

                }

            }

            Spacer(modifier = Modifier.height(16.dp))

            Button(
                onClick = {

                    onAgregarCarrito(
                        producto.id,
                        cantidad
                    )

                },
                modifier = Modifier.fillMaxWidth()
            ) {

                Text("Agregar al carrito")

            }

        }

    }

}