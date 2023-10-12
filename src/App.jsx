import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Actors,
  MovieInformation,
  Movies,
  Navbar,
  Profile,
} from "./components";
import { Content, Root, Toolbar } from "./components/styles";

const App = () => {
  return (
    <Root>
      <BrowserRouter>
        <CssBaseline />
        <Navbar />
        <Content>
          <Toolbar>
            <Routes>
              <Route path="/" element="Home" />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieInformation />} />
              <Route path="/actors/:id" element={<Actors />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          </Toolbar>
        </Content>
      </BrowserRouter>
    </Root>
  );
};

export default App;
