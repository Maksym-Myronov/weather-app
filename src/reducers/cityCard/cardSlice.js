import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialSavedOptions = JSON.parse(localStorage.getItem('savedOptions')) || [];

const initialState = {
    lat: 0,
    lon: 0,
    temp: Array.isArray(initialSavedOptions) ? initialSavedOptions : [],
    status: 'idle',
    error: null
}

const API_KEY = import.meta.env.VITE_WEATHER_APP_KEY;

export const getCity = createAsyncThunk("getCity", async ({ lat, lon }, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json();
        return {temp: data};
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        removeCity: (state, action) => {
            const idRemove = action.payload
            state.temp = state.temp.filter((item) => item.id !== idRemove)
            localStorage.setItem('savedOptions', JSON.stringify(state.temp))
        },
        removeAllCity: (state) => {
            state.temp = []
            localStorage.removeItem('savedOptions');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (Array.isArray(action.payload.temp)) {
                    state.temp = action.payload.temp;
                } else {
                    state.temp = [...state.temp, action.payload.temp];
                }
                localStorage.setItem('savedOptions', JSON.stringify(state.temp));
            })
            .addCase(getCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export default cardSlice.reducer;
export const selectCityData = (state) => state.card;
export const { removeCity, removeAllCity } = cardSlice.actions