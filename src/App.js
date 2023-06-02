import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './component/Pages/Homepage';
import Music from './component/Pages/Music';
import Album from './component/Pages/Album';
import Library from './component/Pages/Library';

function App() {
  return (
    <Router>

        <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/music" exact element={<Music />} />
        <Route path="/album" exact element={<Album />} />
        <Route path="/library" exact element={<Library />} />
        </Routes>

      </Router>
  )
}

export default App