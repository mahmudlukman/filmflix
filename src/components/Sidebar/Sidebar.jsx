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
} from "@mui/material";
import { Link } from "react-router-dom";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top-Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const demoCategories = [
  { label: "Comedy", value: "comedy" },
  { label: "Action", value: "action" },
  { label: "Horror", value: "horror" },
  { label: "Animation", value: "animation" },
];

const redLogo =
  "https://fontmeme.com/permalink/231012/fc51cd936aee781f007455ffc51b51ab.png";
const blueLogo =
  "https://fontmeme.com/permalink/231012/fbf91cf7f941ecc4f4a72a7ebb2a634d.png";

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  return (
    <>
      <Link
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
            key={value}
            to="/"
            color={theme.palette.text.primary}
            style={{ textDecoration: "none" }}
          >
            <ListItem onClick={() => {}} ButtonBase>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  height={30}
                  style={{
                    filter:
                      theme.palette.mode === "dark" ? "dark" : "invert(1)",
                  }}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link
            key={value}
            to="/"
            color={theme.palette.text.primary}
            style={{ textDecoration: "none" }}
          >
            <ListItem onClick={() => {}} ButtonBase>
              {/* <ListItemIcon>
                <img
                  src={redLogo}
                  height={30}
                  style={{
                    filter:
                      theme.palette.mode === "dark" ? "dark" : "invert(1)",
                  }}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
