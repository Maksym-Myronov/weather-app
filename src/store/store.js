import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from './weatherSlice'
import temperatureReducer from "./temperatureSlice";
import cardReducer from './cardSlice'
import cardWeatherReducer from './cardWeatherSlice'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        temperature: temperatureReducer,
        card: cardReducer,
        cardWeather: cardWeatherReducer,
    },
})