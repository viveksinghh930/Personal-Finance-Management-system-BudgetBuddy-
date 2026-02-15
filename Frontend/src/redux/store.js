import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { apiSlice } from "./api/apiSlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


// 🔹 Persist Config (Sirf auth ko persist karenge)
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"], // 👈 Sirf auth persist hoga
};


// 🔹 Combine Reducers
const rootReducer = combineReducers({
  auth: authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer, // 👈 RTK Query reducer add
});


// 🔹 Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// 🔹 Store Create
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(apiSlice.middleware), // 👈 RTK Query middleware add
});


export default store;
