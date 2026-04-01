import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./features/auth.slice";
import { authApi } from "./api/auth.api";
import { movieApi } from "./api/movieApi";
import { seriesApi } from "./api/series.api";
import { paymentApi } from "./api/payment.api";
import { userApi } from "./api/user.api";

const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
  [seriesApi.reducerPath]: seriesApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
  key: "moviehub-root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      movieApi.middleware,
      seriesApi.middleware,
      paymentApi.middleware,
      userApi.middleware,
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
