package com.example.foodapp.presentacion.ProductDetail

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.foodapp.data.model.AddToCartRequest
import com.example.foodapp.domain.repository.ProductoRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class ProductDetailViewModel @Inject constructor(
    private val productoRepository: ProductoRepository
) : ViewModel() {


    private val _uiState =
        MutableStateFlow(ProductDetailState())


    val uiState: StateFlow<ProductDetailState> =
        _uiState.asStateFlow()



    fun obtenerProducto(id: Int) {


        viewModelScope.launch {


            _uiState.value = ProductDetailState(
                isLoading = true
            )


            try {


                val response =
                    productoRepository.getProductoById(id)



                if(response.isSuccessful){


                    _uiState.value =
                        ProductDetailState(
                            producto = response.body()
                        )


                }else{


                    _uiState.value =
                        ProductDetailState(
                            error = "Error ${response.code()}"
                        )

                }



            } catch (e: Exception) {


                _uiState.value =
                    ProductDetailState(
                        error = e.message
                    )


            }


        }


    }




    fun agregarAlCarrito(
        productoId: Int
    ) {


        viewModelScope.launch {


            try {


                val response =
                    productoRepository.agregarAlCarrito(
                        AddToCartRequest(
                            producto_id = productoId,
                            cantidad = 1
                        )
                    )



                if(response.isSuccessful){


                    Log.d(
                        "CARRITO",
                        "Producto agregado correctamente"
                    )


                } else {


                    Log.d(
                        "CARRITO",
                        "Error: ${response.code()}"
                    )


                    Log.d(
                        "CARRITO",
                        response.errorBody()?.string() ?: ""
                    )


                }



            } catch (e: Exception) {


                Log.d(
                    "CARRITO",
                    "Exception: ${e.message}"
                )


            }


        }


    }


}