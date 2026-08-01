package com.example.foodapp.data.datastore

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.example.foodapp.data.model.UsuarioLogin
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton


private val Context.dataStore by preferencesDataStore(
    name = "user_preferences"
)


@Singleton
class TokenManager @Inject constructor(
    @ApplicationContext private val context: Context
) {


    companion object {


        private val TOKEN_KEY =
            stringPreferencesKey("access_token")


        private val USER_ID_KEY =
            intPreferencesKey("user_id")


        private val USER_NAME_KEY =
            stringPreferencesKey("user_name")


        private val USER_LASTNAME_KEY =
            stringPreferencesKey("user_lastname")


        private val USER_EMAIL_KEY =
            stringPreferencesKey("user_email")


        private val USER_ROLE_KEY =
            stringPreferencesKey("user_role")


    }



    // Guardar token

    suspend fun saveToken(token: String) {


        context.dataStore.edit { preferences ->


            preferences[TOKEN_KEY] = token


        }


    }



    // Obtener token

    fun getToken(): Flow<String?> {


        return context.dataStore.data.map { preferences ->


            preferences[TOKEN_KEY]


        }


    }



    // Guardar datos del usuario

    suspend fun saveUser(usuario: UsuarioLogin) {


        context.dataStore.edit { preferences ->


            preferences[USER_ID_KEY] = usuario.id


            preferences[USER_NAME_KEY] = usuario.nombre


            preferences[USER_LASTNAME_KEY] = usuario.apellido


            preferences[USER_EMAIL_KEY] = usuario.email


            preferences[USER_ROLE_KEY] = usuario.role


        }


    }



    // Obtener usuario guardado

    fun getUser(): Flow<UsuarioLogin?> {


        return context.dataStore.data.map { preferences ->


            val id = preferences[USER_ID_KEY]


            if (id != null) {


                UsuarioLogin(

                    id = id,

                    nombre = preferences[USER_NAME_KEY] ?: "",

                    apellido = preferences[USER_LASTNAME_KEY] ?: "",

                    email = preferences[USER_EMAIL_KEY] ?: "",

                    role = preferences[USER_ROLE_KEY] ?: ""

                )


            } else {


                null


            }


        }


    }



    // Cerrar sesión

    suspend fun clearToken() {


        context.dataStore.edit { preferences ->


            preferences.clear()


        }


    }


}