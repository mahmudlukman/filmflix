/* eslint-disable react/prop-types */
import {
  Typography,
  Grid,
  Grow,
  Tooltip,
  Rating,
  useTheme,
  Box,
  Link,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

const Movie = ({ movie, i }) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} padding="10px">
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link
          to={`/movie/${movie.id}`}
          component={RouterLink}
          alignItems="center"
          fontWeight="bolder"
          sx={{
            textDecoration:"none",
            [theme.breakpoints.up("xs")]: {
              display: "flex",
              flexDirection: "column",
            },
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box
            component="img"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://www.fillmurray.com/200/300"
            }
            alt={movie.title}
            borderRadius="20px"
            height="300px"
            marginBottom="10px"
            sx={{ "&:hover": { transform: "scale(1.05)" } }}
          />
          <Typography
            variant="h5"
            sx={{
              textOverflow: "ellipsis",
              color: theme.palette.text.primary,
              width: "230px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              marginTop: "10px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <Box>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </Box>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
