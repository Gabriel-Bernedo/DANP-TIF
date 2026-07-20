package com.example.foodapp.presentacion.home

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
class HomeViewModel @Inject constructor(
    private val productoRepository: ProductoRepository
) : ViewModel() {


    private val _uiState = MutableStateFlow(HomeState())
    val uiState: StateFlow<HomeState> = _uiState.asStateFlow()


    init {
        obtenerProductos()
    }


    private fun obtenerProductos() {

        viewModelScope.launch {

            _uiState.value = HomeState(
                isLoading = true
            )

            try {

                val response = productoRepository.getProductos()

                _uiState.value = HomeState(
                    productos = response.body() ?: emptyList()
                )

            } catch (e: Exception) {

                _uiState.value = HomeState(
                    error = e.message
                )

            }

        }

    }

    fun buscarProducto(texto: String){

        val filtrados = if(texto.isEmpty()){

            _uiState.value.productos

        }else{

            _uiState.value.productos.filter {

                it.nombre.contains(
                    texto,
                    ignoreCase = true
                )

            }

        }


        _uiState.value = _uiState.value.copy(
            busqueda = texto,
            productosFiltrados = filtrados
        )

    }

}