package com.example.foodapp.presentacion.pedidos


import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.foodapp.data.model.CrearPedidoRequest
import com.example.foodapp.domain.repository.PedidoRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class PedidoViewModel @Inject constructor(

    private val repository: PedidoRepository

): ViewModel(){



    private val _uiState =
        MutableStateFlow(PedidoState())


    val uiState:StateFlow<PedidoState> =
        _uiState.asStateFlow()



    init {

        cargarPedidos()

    }



    private fun cargarPedidos(){


        viewModelScope.launch {


            _uiState.value =
                PedidoState(
                    isLoading = true
                )



            try{


                val response =
                    repository.getMisPedidos()



                if(response.isSuccessful){


                    _uiState.value =
                        PedidoState(
                            pedidos =
                                response.body()
                                    ?: emptyList()
                        )


                }else{


                    _uiState.value =
                        PedidoState(
                            error =
                                "Error ${response.code()}"
                        )

                }



            }catch(e:Exception){


                _uiState.value =
                    PedidoState(
                        error =
                            e.message
                    )


            }


        }


    }

    fun crearPedido(){


        viewModelScope.launch {


            try {


                val request =
                    CrearPedidoRequest(

                        direccion_entrega =
                            "Av. Siempre Viva 123",


                        metodo_pago =
                            "tarjeta",


                        fecha_entrega_estimada =
                            "2026-07-21T18:00:00.000Z"

                    )



                val response =
                    repository.crearPedido(request)



                if(response.isSuccessful){


                    Log.d(
                        "PEDIDO",
                        "Pedido creado correctamente"
                    )


                }else{


                    Log.d(
                        "PEDIDO",
                        "Error ${response.code()}"
                    )


                }



            }catch(e:Exception){


                Log.d(
                    "PEDIDO",
                    e.message ?: ""
                )


            }


        }


    }


}