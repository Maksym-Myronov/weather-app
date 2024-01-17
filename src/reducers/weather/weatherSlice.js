import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cities: [],
    status: 'idle',
    error: null
}

const API_KEY = import.meta.env.VITE_WEATHER_APP_KEY;

export const fetchCities = createAsyncThunk("fetchCities", async (value, lat, lon, rejectWithValue) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`);
        const data = await response.json()
        // console.log(data);
        return data
    } catch(error) {
        return rejectWithValue(error.message)
    }
});

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cities = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
})

export default weatherSlice.reducer