import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Actors,
  MovieInformation,
  Movies,
  Navbar,
  Profile,
} from "./components";
import useAlan from "./components/Alan";
import { useRef } from "react";

const App = () => {
  useAlan();
  const alanBtnContainer = useRef();
  return (
    <Box display="flex" height="100%">
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Box sx={{ flexGrow: "1", padding: "2em", width: "100%" }}>
          <Box height="70px" />
          <Routes>
            <Route path="/" element={<Movies />}>
              <Route path="/approved" element={<Movies />} />
            </Route>
            {/* <Route path="/movies" element={<Movies />} /> */}
            <Route path="/movie/:id" element={<MovieInformation />} />
            <Route path="/actors/:id" element={<Actors />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Box>
      </BrowserRouter>
      <Box ref={alanBtnContainer} />
    </Box>
  );
};

export default App;
