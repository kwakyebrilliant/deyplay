import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './component/Pages/Homepage';
import Music from './component/Pages/Music';

function App() {
  return (
    <Router>

        <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/music" exact element={<Music />} />
        </Routes>

      </Router>
  )
}

export default App