import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../feathers/weather/weatherSlice'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    }
})