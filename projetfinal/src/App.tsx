import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTest from './components/PageTest';
import PageAccueil from './components/PageAccueil';
import NavBar from './components/NavBar';
import TestCarousel from './components/TestCarousel';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="pagetest" element={<PageTest/>} />

          <Route path="/" element={<PageAccueil/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
