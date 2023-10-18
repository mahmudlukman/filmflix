import {
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie as MovieIcon,
  PlusOne,
  Remove,
  Theaters,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../redux/services/TMDB";
import genreIcons from "../../assets/genres";
import {
  Box,
  CircularProgress,
  Grid,
  Rating,
  Typography,
  useTheme,
  Link,
  ButtonGroup,
  Button,
  Modal,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../redux/features/currentGenreOrCategory";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";
import { userSelector } from "../../redux/features/auth";

const MyIFrame = styled("iframe")(({ theme }) => ({
  width: "50%",
  height: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: "90%",
  },
}));

const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: recommendations } = useGetRecommendationsQuery({
    list: "/recommendations",
    movie_id: id,
    page: 1,
  });

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.data)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.data)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        import.meta.env.VITE_REACT_APP_TMDB_KEY
      }$session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      },
      {
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_REACT_READ_ACCESS_TOKEN
          }`,
        },
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };
  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        import.meta.env.VITE_REACT_APP_TMDB_KEY
      }$session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      },
      {
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_REACT_READ_ACCESS_TOKEN
          }`,
        },
      }
    );
    setIsMovieWatchlisted((prev) => !prev);
  };

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
      <Grid
        item
        sm={12}
        lg={4}
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "flex",
            marginBottom: "30px",
          },
        }}
      >
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
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "2rem",
            },
          }}
        >
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
            {data?.runtime} min | {data?.spoken_languages[0].name}
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
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }} align="justify">
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      component={RouterLink}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        component="img"
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                        sx={{
                          width: "100%",
                          maxWidth: "7em",
                          height: "8em",
                          objectFit: "cover",
                          borderRadius: "10px",
                          boxShadow: "0.5em 1em 1em rgba(64, 64, 70, 0.5)",
                        }}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
              },
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  marginBottom: "20px",
                },
              }}
            >
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  sx={{ borderColor: "primary.main" }}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} onClick={() => navigate(-1)}>
                  <Typography
                    color="inherit"
                    variant="subtitle2"
                    style={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found!</Box>
        )}
      </Box>
      <Modal
        open={open}
        closeAfterTransition
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data?.videos?.results?.length > 0 && (
          <MyIFrame
            autoPlay
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
