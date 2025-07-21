import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/home/homeSlice"
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { homeAPI } from "../services/home/homeAPI";

const store = configureStore({
    reducer: {
        homeReducer,
        [homeAPI.reducerPath]: homeAPI.reducer
    },
    middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(homeAPI.middleware)),
})

setupListeners(store.dispatch)

export default store