// All slice

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// Slices
import authReducer from "./features/AuthSlice" 


const RootReducer = combineReducers({
    auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: () => [thunk],
});

// Create a persistor
export const persistor = persistStore(store);