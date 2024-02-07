import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../reducers/weather/weatherSlice'
import temperatureReducer from "../reducers/ip/temperatureSlice";
import cardReducer from '../reducers/cityCard/cardSlice'
import cardWeatherReducer from '../reducers/cardWeather/cardWeatherSlice'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        temperature: temperatureReducer,
        card: cardReducer,
        cardWeather: cardWeatherReducer,
    },
})