import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Actors, MovieInformation, Movies, Navbar, Profile} from './components'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <CssBaseline />
        <Navbar/>
        <main>
        <Routes>
            <Route path='/' element='Home' />
            <Route path='/movies' element={<Movies/>} />
            <Route path='/movie/:id' element={<MovieInformation/>} />
            <Route path='/actors/:id' element={<Actors/>} />
            <Route path='/profile/:id' element={<Profile/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
