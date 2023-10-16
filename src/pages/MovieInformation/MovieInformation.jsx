import { Movie as MovieIcon } from "@mui/icons-material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useGetMovieQuery } from "../../redux/services/TMDB";
import genreIcons from "../../assets/genres";
import {
  Box,
  CircularProgress,
  Grid,
  Rating,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../../redux/features/currentGenreOrCategory";

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const theme = useTheme();
  const dispatch = useDispatch()

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/"> Something has gone wrong! Go Back...</Link>
      </Box>
    );
  }

  return (
    <Grid
      container
      display="flex"
      justifyContent="space-around"
      margin="10px 0 !important"
      sx={{
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          flexWrap: "wrap",
        },
      }}
    >
      <Grid item sm={12} lg={4}>
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
          sx={{
            borderRadius: "20px",
            boxShadow: "0.5em 1em 1em rgba(64, 64, 70, 0.5)",
            width: "80%",
            [theme.breakpoints.down("md")]: {
              margin: "0 auto",
              width: "50%",
              height: "350px",
            },
            [theme.breakpoints.down("sm")]: {
              margin: "0 auto",
              width: "100%",
              height: "350px",
              marginBottom: "30px",
            },
          }}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid
          item
          display="flex"
          justifyContent="space-around"
          margin="10px 0 !important"
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              flexWrap: "wrap",
            },
          }}
        >
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min{" "}
            {data?.spoken_languages.length > 0
              ? ` / ${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            margin: "10px 0 !important",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              to="/"
              component={RouterLink}
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                [theme.breakpoints.down("sm")]: {
                  padding: "0.5rem 1rem",
                },
              }}
            >
              <Box
                component="img"
                src={genreIcons[genre.name.toLowerCase()]}
                height={30}
                sx={{
                  filter: theme.palette.mode === "dark" && "invert(1)",
                  marginRight: "10px",
                }}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieInformation;
