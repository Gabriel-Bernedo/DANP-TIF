package com.example.foodapp.data.datastore

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton


private val Context.dataStore by preferencesDataStore(
    name = "user_preferences"
)


@Singleton
class TokenManager @Inject constructor(
    private val context: Context
) {


    companion object {

        private val TOKEN_KEY =
            stringPreferencesKey("access_token")

    }


    suspend fun saveToken(token: String) {

        context.dataStore.edit { preferences ->

            preferences[TOKEN_KEY] = token

        }

    }


    fun getToken(): Flow<String?> {

        return context.dataStore.data.map { preferences ->

            preferences[TOKEN_KEY]

        }

    }


    suspend fun clearToken() {

        context.dataStore.edit { preferences ->

            preferences.clear()

        }

    }

}