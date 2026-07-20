package com.example.foodapp.presentacion.register

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.foodapp.data.model.RegisterRequest
import com.example.foodapp.domain.repository.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class RegisterViewModel @Inject constructor(
    private val repository: AuthRepository
) : ViewModel() {

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _registerSuccess = MutableStateFlow(false)
    val registerSuccess: StateFlow<Boolean> = _registerSuccess

    private val _error = MutableStateFlow("")
    val error: StateFlow<String> = _error

    fun register(

        nombre: String,
        apellido: String,
        email: String,
        password: String,
        telefono: String?,
        direccion: String?

    ) {

        viewModelScope.launch {

            _isLoading.value = true

            try {

                val response = repository.register(

                    RegisterRequest(
                        nombre,
                        apellido,
                        email,
                        password,
                        telefono,
                        direccion
                    )

                )

                if (response.isSuccessful) {

                    _registerSuccess.value = true

                } else {

                    _error.value = "No se pudo registrar"

                }

            } catch (e: Exception) {

                _error.value = e.message ?: "Error"

            }

            _isLoading.value = false

        }

    }

}