import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    lat: 0,
    lon: 0,
    temp: {},
    status: 'idle',
    error: null
}

const API_KEY = import.meta.env.VITE_WEATHER_APP_KEY;

export const getTemperature = createAsyncThunk("getTemperature", async ({ lat, lon }, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json()
        // console.log(data);
        return { lat, lon, temp: data };
    } catch(error) {
        return rejectWithValue(error.message)
    }
});

export const temperatureSlice = createSlice({
    name: "temperature",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTemperature.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTemperature.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lat = action.payload.lat;
                state.lon = action.payload.lon;
                state.temp = action.payload.temp;
            })
            .addCase(getTemperature.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
})

export default temperatureSlice.reducer;
export const selectTemperatureData = (state) => state.temperature;