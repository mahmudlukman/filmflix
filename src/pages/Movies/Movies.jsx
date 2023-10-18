import { useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../../redux/services/TMDB";
import MovieList from "../../components/MovieList/MovieList";
import Pagination from "../../components/pagination/Pagination";
import FeaturedMovies from "../../components/FeaturedMovie/FeaturedMovies";

const Movies = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  const lg = useMediaQuery(theme.breakpoints.only("lg"));

  let numberOfMovies = lg ? 17 : 19;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name. <br /> Please search for something
          else
        </Typography>
      </Box>
    );
  }

  if (error) return "An error has occurred";
  return (
    <div>
      <FeaturedMovies movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst/>
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
};

export default Movies;
