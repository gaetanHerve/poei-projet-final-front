import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTest from "./components/PageTest";
import NavBar from "./components/NavBar";
import TestCarousel from "./components/TestCarousel";
import TestNavbarFooter from "./components/TestNavbarFooter";
import Footer from "./components/Footer";
import PageAccueil from "./components/PageAccueil";
import PageCompagnons from "./components/PageCompagnons";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="pagetest" element={<PageTest />} />
          <Route path="noscompagnons" element={<PageCompagnons />} />

          <Route path="/" element={<PageAccueil />} />
          <Route path="testfooter" element={<TestNavbarFooter />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
