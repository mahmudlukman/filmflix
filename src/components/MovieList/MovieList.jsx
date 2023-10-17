/* eslint-disable react/prop-types */
import { Grid, useTheme } from "@mui/material";
import Movie from "../Movie/Movie";

const MovieList = ({ movies, numberOfMovies }) => {
  const theme = useTheme();
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
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i}/>
      ))}
    </Grid>
  );
};

export default MovieList;
