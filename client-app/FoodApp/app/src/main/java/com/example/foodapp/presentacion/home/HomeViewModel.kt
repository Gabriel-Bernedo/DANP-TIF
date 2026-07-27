package com.example.foodapp.presentacion.home

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.foodapp.data.model.AddToCartRequest
import com.example.foodapp.data.model.Categoria
import com.example.foodapp.data.model.Producto
import com.example.foodapp.domain.repository.CarritoRepository
import com.example.foodapp.domain.repository.ProductoRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject


@HiltViewModel
class HomeViewModel @Inject constructor(
    private val productoRepository: ProductoRepository,
    private val carritoRepository: CarritoRepository
) : ViewModel()  {


    private val _uiState = MutableStateFlow(HomeState())
    val uiState: StateFlow<HomeState> = _uiState.asStateFlow()
    private val productosOriginales = mutableListOf<Producto>()
    private var categoriasOriginales = listOf<Categoria>()
    init {

        obtenerProductos()
        obtenerCategorias()

    }


    private fun obtenerProductos() {

        viewModelScope.launch {

            _uiState.value = _uiState.value.copy(
                isLoading = true
            )

            try {

                val response = productoRepository.getProductos()

                val lista = response.body() ?: emptyList()

                productosOriginales.clear()
                productosOriginales.addAll(lista)

                _uiState.value = _uiState.value.copy(
                    productos = lista,
                    isLoading = false
                )

            } catch (e: Exception) {

                _uiState.value = _uiState.value.copy(
                    isLoading = false,
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
    suspend fun agregarAlCarrito(
        productoId: Int,
        cantidad: Int
    ): Boolean {

        return try {

            val response = carritoRepository.agregarAlCarrito(
                AddToCartRequest(
                    producto_id = productoId,
                    cantidad = cantidad
                )
            )

            if (response.isSuccessful) {

                Log.d(
                    "HOME",
                    "Producto agregado al carrito"
                )

                true

            } else {

                Log.d(
                    "HOME",
                    "Error ${response.code()}"
                )

                false

            }

        } catch (e: Exception) {

            Log.d(
                "HOME",
                e.message ?: "Error"
            )

            false
        }

    }

    private fun obtenerCategorias() {

        viewModelScope.launch {

            try {

                val response = productoRepository.getCategorias()

                categoriasOriginales = response.body() ?: emptyList()

                _uiState.value = _uiState.value.copy(
                    categorias = categoriasOriginales
                )

            } catch (e: Exception) {

                Log.d(
                    "HOME",
                    e.message ?: ""
                )

            }

        }

    }

    fun mostrarTodos() {

        _uiState.value = _uiState.value.copy(
            productos = productosOriginales
        )

    }

    fun filtrarCategoria(
        categoriaId: Int
    ) {

        _uiState.value = _uiState.value.copy(

            productos = productosOriginales.filter {

                it.categoria_id == categoriaId

            }

        )

    }

    fun filtrarOfertas() {

        _uiState.value = _uiState.value.copy(

            productos = productosOriginales.filter {

                it.precio_descuento != null &&
                        it.precio_descuento != it.precio_original

            }

        )

    }



}