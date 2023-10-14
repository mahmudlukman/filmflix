import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import { setupListeners } from "@reduxjs/toolkit/query";


export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})

setupListeners(store.dispatch)

