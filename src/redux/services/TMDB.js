import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_REACT_APP_TMDB_KEY;
const readToken = import.meta.env.VITE_REACT_READ_ACCESS_TOKEN;

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
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

     // Get Movies by [Type]
     getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get popular movies by default
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    // Get Movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    }),

    // Get User Specific Lists
    getList: builder.query({
      query: ({listName, accountId, sessionId, page}) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

    // Get User Specific Lists
    getRecommendations: builder.query({
      query: ({movie_id, list}) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
    }),

    // Get Actors Details
    getActorsDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`
    }),

    // Get Movies by Actors
    getMoviesByActorId: builder.query({
      query: ({id, page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
    }),
  }),
});

export const { 
  useGetMoviesQuery, 
  useGetGenresQuery, 
  useGetMovieQuery, 
  useGetListQuery, 
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery, 
  useGetMoviesByActorIdQuery 
} = tmdbApi;
