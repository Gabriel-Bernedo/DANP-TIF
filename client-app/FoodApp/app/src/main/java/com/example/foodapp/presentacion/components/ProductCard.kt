package com.example.foodapp.presentacion.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import com.example.foodapp.data.model.Producto
import com.example.foodapp.ui.theme.FoodBlack
import com.example.foodapp.ui.theme.FoodGreen
import com.example.foodapp.ui.theme.FoodGray


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
            },


        shape = RoundedCornerShape(24.dp),


        elevation = CardDefaults.cardElevation(
            defaultElevation = 4.dp
        )


    ) {


        Column {
            // IMAGEN

            AsyncImage(
                model = producto.imagen_url
                    ?: "https://i.pinimg.com/236x/2a/c1/c2/2ac1c2a02e15def63c7632fa359b3014.jpg",
                contentDescription = producto.nombre,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp),
                contentScale = ContentScale.Crop

            )



            Column(

                modifier = Modifier
                    .padding(16.dp)

            ){


                // NOMBRE

                Text(

                    text = producto.nombre,

                    style = MaterialTheme.typography.titleLarge

                )



                Spacer(
                    modifier = Modifier.height(6.dp)
                )



                // DESCRIPCION

                Text(

                    text = producto.descripcion,

                    style = MaterialTheme.typography.bodyMedium,

                    color = FoodGray,

                    maxLines = 2

                )



                Spacer(
                    modifier = Modifier.height(12.dp)
                )



                // PRECIOS

                Row(

                    horizontalArrangement = Arrangement.spacedBy(10.dp)

                ){

                    if (producto.precio_descuento != null) {


                        Row(

                            horizontalArrangement = Arrangement.spacedBy(8.dp)

                        ) {


                            Text(

                                text = "S/. ${producto.precio_original}",

                                color = FoodGray,

                                style = MaterialTheme.typography.bodyMedium,

                                textDecoration = TextDecoration.LineThrough

                            )



                            Text(

                                text = "S/. ${producto.precio_descuento}",

                                color = FoodGreen,

                                style = MaterialTheme.typography.titleLarge,

                                fontWeight = FontWeight.Bold

                            )


                        }


                    } else {


                        Text(

                            text = "S/. ${producto.precio_original}",

                            color = FoodBlack,

                            style = MaterialTheme.typography.titleLarge,

                            fontWeight = FontWeight.Bold

                        )


                    }
                }

                Spacer(
                    modifier = Modifier.height(8.dp)
                )

                Text(
                    text = "Disponible: ${producto.cantidad_disponible}",
                    style = MaterialTheme.typography.bodyMedium
                )

                Spacer(
                    modifier = Modifier.height(16.dp)
                )



                // CONTROL DE CANTIDAD

                Row(

                    modifier = Modifier.fillMaxWidth(),

                    horizontalArrangement = Arrangement.Center,

                    verticalAlignment = Alignment.CenterVertically

                ){



                    FilledIconButton(

                        onClick = {

                            if(cantidad > 1){
                                cantidad--
                            }

                        }

                    ){

                        Icon(
                            imageVector = Icons.Default.Remove,
                            contentDescription = null
                        )

                    }




                    Text(

                        text = cantidad.toString(),

                        style = MaterialTheme.typography.titleLarge,

                        modifier = Modifier.padding(horizontal = 20.dp)

                    )




                    FilledIconButton(

                        onClick = {

                            if(cantidad < producto.cantidad_disponible){
                                cantidad++
                            }

                        }

                    ){

                        Icon(

                            imageVector = Icons.Default.Add,

                            contentDescription = null

                        )

                    }


                }



                Spacer(
                    modifier = Modifier.height(16.dp)
                )




                // BOTON CARRITO

                Button(

                    onClick = {


                        onAgregarCarrito(

                            producto.id,

                            cantidad

                        )

                    },


                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp),


                    shape = RoundedCornerShape(16.dp)

                ){



                    Icon(

                        imageVector = Icons.Default.ShoppingCart,

                        contentDescription = null

                    )



                    Spacer(
                        modifier = Modifier.width(8.dp)
                    )



                    Text(
                        text = "Agregar al carrito"
                    )


                }


            }


        }


    }


}