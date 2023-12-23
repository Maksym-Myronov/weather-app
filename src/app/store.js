import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../feathers/weather/weatherSlice'
import temperatureReducer from "../feathers/ip/temperatureSlice";

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        temperature: temperatureReducer,
    },
})