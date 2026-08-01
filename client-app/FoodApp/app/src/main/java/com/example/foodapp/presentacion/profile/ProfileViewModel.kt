package com.example.foodapp.presentacion.profile
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.foodapp.data.datastore.TokenManager
import com.example.foodapp.data.model.Pedido
import com.example.foodapp.data.model.UsuarioLogin
import com.example.foodapp.domain.repository.PedidoRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(

    private val tokenManager: TokenManager,

    private val pedidoRepository: PedidoRepository

) : ViewModel() {



    private val _usuario =
        MutableStateFlow<UsuarioLogin?>(null)

    val usuario: StateFlow<UsuarioLogin?> = _usuario



    private val _pedidos =
        MutableStateFlow<List<Pedido>>(emptyList())

    val pedidos: StateFlow<List<Pedido>> = _pedidos



    init {

        obtenerUsuario()

        obtenerPedidos()

    }



    private fun obtenerUsuario(){

        viewModelScope.launch {

            tokenManager.getUser()
                .collect { usuario ->

                    _usuario.value = usuario

                }

        }

    }



    private fun obtenerPedidos(){


        viewModelScope.launch {


            try {


                val response = pedidoRepository.getMisPedidos()



                if(response.isSuccessful){


                    _pedidos.value =
                        response.body() ?: emptyList()


                }


            }catch(e: Exception){


                e.printStackTrace()


            }


        }


    }



}