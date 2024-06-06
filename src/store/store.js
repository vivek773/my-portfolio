// Store

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Slices
import authReducer from "./features/AuthSlice";
import fleetReducer from "./features/FleetSlice";
import businessReducer from "./features/BusinessSlice";
import destinationsReducer from "./features/DestinationsSlice";
import bookingsReducer from "./features/BookingsSlice";
import paymentsReducer from "./features/PaymentsSlice";
import UserReducer from "./features/UserSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  fleet: fleetReducer,
  business: businessReducer,
  destinations: destinationsReducer,
  bookings: bookingsReducer,
  payments: paymentsReducer,
  User: UserReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
