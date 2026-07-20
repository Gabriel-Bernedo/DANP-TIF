package com.example.foodapp.di

import com.example.foodapp.data.repository.AuthRepositoryImpl
import com.example.foodapp.data.repository.ProductoRepositoryImpl
import com.example.foodapp.domain.repository.AuthRepository
import com.example.foodapp.domain.repository.ProductoRepository
import com.example.foodapp.network.ApiService
import com.example.foodapp.network.RetrofitInstance
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton
import android.content.Context
import com.example.foodapp.data.datastore.TokenManager
import dagger.hilt.android.qualifiers.ApplicationContext
import com.example.foodapp.data.repository.PedidoRepositoryImpl
import com.example.foodapp.domain.repository.PedidoRepository

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideApiService(
        retrofitInstance: RetrofitInstance
    ): ApiService {

        return retrofitInstance.api

    }

    @Provides
    @Singleton
    fun provideAuthRepository(
        impl: AuthRepositoryImpl
    ): AuthRepository {
        return impl
    }

    @Provides
    @Singleton
    fun provideProductoRepository(
        impl: ProductoRepositoryImpl
    ): ProductoRepository {
        return impl
    }

    @Provides
    @Singleton
    fun provideTokenManager(
        @ApplicationContext context: Context
    ): TokenManager {

        return TokenManager(context)

    }
    @Provides
    @Singleton
    fun providePedidoRepository(
        impl: PedidoRepositoryImpl
    ): PedidoRepository {

        return impl

    }

}