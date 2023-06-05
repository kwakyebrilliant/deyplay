import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './component/Pages/Homepage';
import Music from './component/Pages/Music';
import Album from './component/Pages/Album.js';
import Library from './component/Pages/Library';
import AlbumSingle from './component/Singles/AlbumSingle';
import MusicSingle from './component/Singles/MusicSingle';
import Dashboard from './dashboard/Pages/Dashboard';

function App() {
  return (
    <Router>

        <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/music" exact element={<Music />} />
        <Route path="/album" exact element={<Album />} />
        <Route path="/library" exact element={<Library />} />
        <Route path="/albumsingle" exact element={<AlbumSingle />} />
        <Route path="/musicsingle" exact element={<MusicSingle />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>

      </Router>
  )
}

export default App