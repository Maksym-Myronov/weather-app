import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LocalStorage from '../../core/helper/index'

const initialSavedOptions = LocalStorage.getItem('savedOptions') || [];

const initialState = {
    lat: 0,
    lon: 0,
    temp: Array.isArray(initialSavedOptions) ? initialSavedOptions.map(item => ({ ...item, isFavorite: false })) : [],
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

const savedState = initialSavedOptions ? { ...initialState, temp: initialSavedOptions } : initialState;

const cardSlice = createSlice({
    name: "card",
    initialState: savedState,
    reducers: {
        removeCity: (state, action) => {
            const idRemove = action.payload
            state.temp = state.temp.filter((item) => item.id !== idRemove)
            LocalStorage.setItem('savedOptions', state.temp)
        },
        removeAllCity: (state) => {
            state.temp = []
            LocalStorage.removeItem('savedOptions')
        },
        updateFavoriteStatus: (state, action) => {
            const updatedTemp = action.payload;
            state.temp = updatedTemp;
            LocalStorage.setItem('savedOptions', updatedTemp);
        },
        
        updateSelectCity: (state, action) => {
            state.temp = [...action.payload];
            LocalStorage.setItem('selectedCity', state.temp)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCity.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const newCity = action.payload.temp;
                if (!state.temp.some(city => city.id === newCity.id)) {
                    state.temp = [...state.temp, newCity];
                    LocalStorage.setItem('savedOptions', state.temp)
                }
            })
            .addCase(getCity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export default cardSlice.reducer;
export const selectCityData = (state) => state.card;
export const { removeCity, removeAllCity, updateFavoriteStatus, updateSelectCity } = cardSlice.actions