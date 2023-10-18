/* eslint-disable react/prop-types */
import { Grid, useTheme } from "@mui/material";
import Movie from "../Movie/Movie";

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const theme = useTheme();
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <Grid
      container
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      overflow="auto"
      sx={{
        [theme.breakpoints.down("sm")]: {
          justifyContent: "center",
        },
      }}
    >
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
