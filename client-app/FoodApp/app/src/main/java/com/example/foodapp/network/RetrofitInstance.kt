package com.example.foodapp.network


import com.example.foodapp.data.datastore.TokenManager
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Inject
import javax.inject.Singleton



@Singleton
class RetrofitInstance @Inject constructor(
    private val tokenManager: TokenManager
) {


    private val BASE_URL =
        "https://danp.api.auroboros.lat/"



    private val client = OkHttpClient.Builder()
        .addInterceptor(
            AuthInterceptor(tokenManager)
        )
        .build()



    val api: ApiService = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(client)
        .addConverterFactory(
            GsonConverterFactory.create()
        )
        .build()
        .create(ApiService::class.java)


}