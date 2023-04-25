import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import WebLayout from "./pages/layouts/webLayout";
import LandingPage from "./pages/main/landingPage";
import Characters from "./pages/characters";
import CharacterById from "./pages/characterById";
import Episodes from "./pages/episodes";
import EpisodeById from "./pages/episodeById";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characterById/:id" element={<CharacterById />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodeById/:id" element={<EpisodeById />} />
        </Route>
        <Route path="*" element={<div>error</div>} />
      </Routes>
    </Router>
  );
}

export default App;
