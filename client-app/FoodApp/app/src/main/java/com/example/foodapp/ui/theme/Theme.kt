package com.example.foodapp.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable



private val FoodLightColorScheme = lightColorScheme(

    primary = FoodGreen,

    secondary = FoodOrange,

    tertiary = FoodGreenDark,


    background = FoodBackground,

    surface = FoodWhite,


    onPrimary = FoodWhite,

    onSecondary = FoodWhite,

    onTertiary = FoodWhite,


    onBackground = FoodBlack,

    onSurface = FoodBlack

)



private val FoodDarkColorScheme = darkColorScheme(

    primary = FoodGreen,

    secondary = FoodOrange,

    tertiary = FoodGreenDark,


    )



@Composable
fun FoodAppTheme(

    darkTheme: Boolean = false,

    content: @Composable () -> Unit

) {


    MaterialTheme(

        colorScheme = if (darkTheme)
            FoodDarkColorScheme
        else
            FoodLightColorScheme,


        typography = Typography,


        content = content

    )

}