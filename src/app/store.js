import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from './api/apiSlice';
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth : authReducer,
    },
    middleware: GetDefaultMiddleware =>
        GetDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true  //false only if deplyoed
}) 


setupListeners(store.dispatch);