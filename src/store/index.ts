import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../features/home/homeSlice"
import userReducer from "../features/user/userSlice"
import familyReducer from "../features/family/familySlice"
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { homeAPI } from "../services/home/homeAPI";
import { userAPI } from "../services/user/userAPI";
import { authAPI } from "../services/auth/authAPI";
import { familyAPI } from "../services/family/familyAPI";


const store = configureStore({
    reducer: {
        homeReducer,
        userReducer,
        familyReducer,
        [homeAPI.reducerPath]: homeAPI.reducer,
        [familyAPI.reducerPath]: familyAPI.reducer,
        [userAPI.reducerPath]: userAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer
    },
    middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(homeAPI.middleware).concat(familyAPI.middleware).concat(userAPI.middleware).concat(authAPI.middleware)),
})

setupListeners(store.dispatch)

export default store