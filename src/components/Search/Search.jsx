import { useState } from "react";
import { TextField, InputAdornment, useTheme, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchMovie } from "../../redux/features/currentGenreOrCategory";

const Search = () => {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const location = useLocation()

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Here", query);
      dispatch(searchMovie(query));
    }
  };

  if(location.pathname !== '/') return null
  return (
    <Box
      sx={{
        [theme.breakpoints.down("sm")]: {
          display: "flex",
          justifyContent: "center",
          width: "100%",
        },
      }}
    >
      <TextField
        onKeyUp={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        sx={{
          color: theme.palette.mode === "light" && "black",
          filter: theme.palette.mode === "light" && "invert(1)",
          [theme.breakpoints.down("sm")]: {
            marginTop: "-10",
            marginBottom: "10",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
