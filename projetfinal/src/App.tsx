import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTest from './components/PageTest';
import NavBar from './components/NavBar';
import TestNavbarFooter from './components/TestNavbarFooter';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="pagetest" element={<PageTest/>} />
          <Route path="testfooter" element={<TestNavbarFooter/>} />
          {/* <Route path="/" element={<PageAccueil/>} /> */}
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
