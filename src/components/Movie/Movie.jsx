/* eslint-disable react/prop-types */
import {
  Typography,
  Grid,
  Grow,
  Tooltip,
  Rating,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const Movie = ({ movie, i }) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} padding="10px">
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
    </Grid>
  );
};

export default Movie;
