import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    temp: {},
    lat: 0,
    lon: 0,
    status: 'idle',
    error: null
}

const API_KEY = import.meta.env.VITE_WEATHER_APP_KEY;

export const getLocalCity = createAsyncThunk("getLocalCity", async ({ lat, lon }, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json()
        // console.log(data);
        return { lat, lon, temp: data };
    } catch(error) {
        return rejectWithValue(error.message)
    }
});

export const cardWeatherSlice = createSlice({
    name: "cardWeather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getLocalCity.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getLocalCity.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;
            state.temp = action.payload.temp;
        })
        .addCase(getLocalCity.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
})

export default cardWeatherSlice.reducer;
export const selectLocalCity = (state) => state.cardWeather;