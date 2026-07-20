package com.example.foodapp.presentacion.carrito

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.foodapp.data.model.CarritoDetalle



@Composable
fun ProductoCarritoItem(
    detalle: CarritoDetalle,
    onDelete: () -> Unit

){


    Card(

        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)

    ){


        Column(

            modifier = Modifier
                .padding(16.dp)

        ){


            Text(

                text = detalle.productos.nombre,

                style = MaterialTheme.typography.titleMedium

            )


            Spacer(
                modifier = Modifier.height(8.dp)
            )



            Text(

                text = detalle.productos.descripcion

            )



            Spacer(
                modifier = Modifier.height(8.dp)
            )



            Text(

                text = "Cantidad: ${detalle.cantidad}"

            )



            Text(

                text = "Precio: S/. ${detalle.precio_unitario}"

            )



            Text(

                text = "Subtotal: S/. ${
                    detalle.cantidad *
                            detalle.precio_unitario.toDouble()
                }"

            )

            Spacer(
                modifier = Modifier.height(10.dp)
            )


            Button(

                onClick = {
                    onDelete()
                },

                modifier = Modifier.fillMaxWidth()

            ){

                Text(
                    text = "Eliminar del carrito"
                )

            }



        }


    }


}