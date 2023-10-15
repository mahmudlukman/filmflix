import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_REACT_APP_TMDB_KEY;
const readToken = import.meta.env.VITE_REACT_READ_ACCESS_TOKEN;
const page = 1;

// 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${readToken}`);
    },
  }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApi}`,
    }),

    // Get Movies by [Type]
    getMovies: builder.query({
      query: () => `movie/popular?page=${page}&api-key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
