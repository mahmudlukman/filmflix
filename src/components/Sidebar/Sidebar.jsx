import { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  useTheme,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useGetGenresQuery } from "../../redux/services/TMDB";
import genreIcons from "../../assets/genres";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top-Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const redLogo =
  "https://fontmeme.com/permalink/231012/fc51cd936aee781f007455ffc51b51ab.png";
const blueLogo =
  "https://fontmeme.com/permalink/231012/fbf91cf7f941ecc4f4a72a7ebb2a634d.png";

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();

  return (
    <>
      <Link
        component={RouterLink}
        to="/"
        style={{ display: "flex", justifyContent: "center", padding: "10% 0" }}
      >
        <img
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
          alt="Filmflix Logo"
          width={"70%"}
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            component={RouterLink}
            key={value}
            to="/"
            color={theme.palette.text.primary}
            style={{ textDecoration: "none" }}
          >
            <ListItem onClick={() => {}} buttonbase="true">
              <ListItemIcon>
                <Box
                  component='img'
                  src={genreIcons[label.toLowerCase()]}
                  height={30}
                  // style={{
                  //   filter:
                  //     theme.palette.mode === "dark" ? "dark" : "invert(1)",
                  // }}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link
              key={name}
              to="/"
              color={theme.palette.text.primary}
              style={{ textDecoration: "none" }}
            >
              <ListItem onClick={() => {}} buttonbase="true">
                <ListItemIcon>
                  <Box
                    component='img'
                    src={genreIcons[name.toLowerCase()]}
                    height={30}
                    // sx={{
                    //   filter:
                    //     theme.palette.mode === "dark" ? "dark" : "invert(1)",
                    // }}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
