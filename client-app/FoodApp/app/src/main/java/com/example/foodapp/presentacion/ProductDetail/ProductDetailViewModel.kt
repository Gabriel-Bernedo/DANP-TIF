package com.example.foodapp.presentacion.ProductDetail

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
class ProductDetailViewModel @Inject constructor(
    private val productoRepository: ProductoRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(ProductDetailState())
    val uiState: StateFlow<ProductDetailState> = _uiState.asStateFlow()

    fun obtenerProducto(id: Int) {

        viewModelScope.launch {

            _uiState.value = ProductDetailState(
                isLoading = true
            )

            try {

                val response = productoRepository.getProductoById(id)

                _uiState.value = ProductDetailState(
                    producto = response.body()
                )

            } catch (e: Exception) {

                _uiState.value = ProductDetailState(
                    error = e.message
                )

            }

        }

    }

}