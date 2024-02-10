import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import GetIn from "./pages/getin";
import Profile from "./pages/profile";
import Room from "./pages/room";
import { Redr } from "./warehouse/nav";
import PubProfile from "./pages/pub-profile";
const App: React.FC = () => {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redr />} />
        <Route path="/home" element={<Home />} />
        <Route path="/getin" element={<GetIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/room/:roomKey" element={<Room />} />

        <Route path="/profile/:username" element={<PubProfile />} />

      </Routes>
    </BrowserRouter>
  </>)
}

export default App;