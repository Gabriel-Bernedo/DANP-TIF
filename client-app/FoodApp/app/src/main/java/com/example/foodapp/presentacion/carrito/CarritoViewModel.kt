package com.example.foodapp.presentacion.carrito

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.foodapp.domain.repository.ProductoRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject



@HiltViewModel
class CarritoViewModel @Inject constructor(
    private val repository: ProductoRepository
): ViewModel(){



    private val _uiState =
        MutableStateFlow(CarritoState())


    val uiState: StateFlow<CarritoState> =
        _uiState.asStateFlow()



    init {

        obtenerCarrito()

    }



    fun obtenerCarrito(){


        viewModelScope.launch {


            _uiState.value =
                CarritoState(
                    isLoading = true
                )


            try {


                val response =
                    repository.obtenerCarrito()



                if(response.isSuccessful){


                    _uiState.value =
                        CarritoState(
                            carrito = response.body()
                        )


                }else{


                    _uiState.value =
                        CarritoState(
                            error = "Error ${response.code()}"
                        )

                }



            }catch(e:Exception){


                _uiState.value =
                    CarritoState(
                        error = e.message
                    )


            }


        }


    }

    fun eliminarProducto(
        detalleId: Int
    ){

        viewModelScope.launch {

            try {


                val response =
                    repository.eliminarProductoCarrito(
                        detalleId
                    )


                if(response.isSuccessful){

                    // volvemos a cargar el carrito

                    obtenerCarrito()


                }


            }catch(e:Exception){


            }


        }

    }


}