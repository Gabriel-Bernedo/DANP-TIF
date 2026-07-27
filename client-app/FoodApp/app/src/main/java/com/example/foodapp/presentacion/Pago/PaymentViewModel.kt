package com.example.foodapp.presentacion.Pago

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
class PaymentViewModel @Inject constructor(
    private val repository: PedidoRepository
) : ViewModel() {

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _pedidoCreado = MutableStateFlow(false)
    val pedidoCreado: StateFlow<Boolean> = _pedidoCreado.asStateFlow()

    private val _error = MutableStateFlow("")
    val error: StateFlow<String> = _error.asStateFlow()

    fun crearPedido(
        direccion: String,
        metodoPago: String
    ) {

        viewModelScope.launch {

            _isLoading.value = true

            try {

                val request = CrearPedidoRequest(
                    direccion_entrega = direccion,
                    metodo_pago = metodoPago,
                    fecha_entrega_estimada = "2026-07-30T18:00:00.000Z"
                )

                val response = repository.crearPedido(request)

                if (response.isSuccessful) {

                    _pedidoCreado.value = true

                } else {

                    _error.value = "No se pudo crear el pedido"

                }

            } catch (e: Exception) {

                _error.value = e.message ?: "Error"

            }

            _isLoading.value = false

        }

    }

}