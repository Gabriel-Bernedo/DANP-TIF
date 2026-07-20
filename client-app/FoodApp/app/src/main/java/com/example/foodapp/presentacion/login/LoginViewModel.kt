package com.example.foodapp.presentacion.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.foodapp.domain.repository.AuthRepository
import com.example.foodapp.data.model.LoginRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject
import android.util.Log
import com.example.foodapp.data.datastore.TokenManager

@HiltViewModel
class LoginViewModel @Inject constructor(
    private val repository: AuthRepository,
    private val tokenManager: TokenManager
) : ViewModel() {

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow("")
    val error: StateFlow<String> = _error

    private val _loginSuccess = MutableStateFlow(false)
    val loginSuccess: StateFlow<Boolean> = _loginSuccess

    fun login(email: String, password: String) {

        viewModelScope.launch {

            _isLoading.value = true

            try {

                val response = repository.login(
                    LoginRequest(email, password)
                )

                if (response.isSuccessful) {

                    val token = response.body()?.access_token
                    if (token != null) {

                        tokenManager.saveToken(token)

                        Log.d(
                            "TOKEN",
                            "Token guardado correctamente"
                        )

                    }
                    Log.d("LOGIN", "Login exitoso")
                    Log.d("LOGIN", response.body().toString())

                    _loginSuccess.value = true

                } else {

                    Log.d("LOGIN", "Error: ${response.code()}")
                    Log.d("LOGIN", response.errorBody()?.string() ?: "")

                    _error.value = "Correo o contraseña incorrectos"

                }

            } catch (e: Exception) {

                _error.value = e.message ?: "Error desconocido"

            }

            _isLoading.value = false

        }

    }

}