import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../redux/services/TMDB";
import MovieList from "../../components/MovieList/MovieList";

const Movies = () => {
  const { data } = useGetMoviesQuery();
  console.log(data);
  return (
    <div>
      <MovieList />
    </div>
  );
};

export default Movies;
