/* eslint-disable react/prop-types */
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Search from "../Search/Search";
import { fetchToken, createSessionId, moviesApi } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../redux/features/auth";
import { ColorModeContext } from "../../utils/ToggleColorMode";

const drawerWidth = 240;

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const dispatch = useDispatch();

  const colorMode = useContext(ColorModeContext)

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            height: "80px",
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "240px",
            [theme.breakpoints.down("sm")]: {
              marginLeft: 0,
              flexWrap: "wrap",
            },
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              sx={{
                marginRight: theme.spacing(2),
                [theme.breakpoints.up("sm")]: {
                  display: "none",
                },
              }}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.ToggleColorMode}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <Box>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                sx={{
                  "&:hover": {
                    color: "white !important",
                    textDecoration: "none",
                  },
                }}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                />
              </Button>
            )}
          </Box>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <Box>
        <Box
          sx={{
            [theme.breakpoints.up("sm")]: {
              width: drawerWidth,
              flexShrink: 0,
            },
          }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              ModalProps={{ keepMounted: true }}
              style={{ width: drawerWidth }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
