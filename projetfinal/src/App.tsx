import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTest from "./components/PageTest";
import NavBar from "./components/NavBar";
import TestNavbarFooter from "./components/TestNavbarFooter";
import Footer from "./components/Footer";
import PageAccueil from "./components/PageAccueil";
import PageConnexion from "./components/PageConnexion";
import PageCompagnons from "./components/PageCompagnons";
import PageVueCompagnon from "./components/PageVueCompagnon";
import Compte from "./components/Compte";
import PageCreationUtilisateur from "./components/PageCreationUtilisateur";
import PageinfosCompte from "./components/PageinfosCompte";
import RecapPanier from "./components/RecapPanier";
import PageArticle from "./components/PageArticle";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Routes>
          <Route path="connexion" element={<PageConnexion />} />
          <Route path="pagetest" element={<PageTest />} />
          <Route path="/" element={<PageAccueil />} />
          <Route path="noscompagnons" element={<PageCompagnons />} />
          <Route path="testfooter" element={<TestNavbarFooter />} />
          <Route path="findbyid/:id" element={<PageVueCompagnon />} />
          <Route path="creercompte" element={<PageCreationUtilisateur />} />
          <Route path="infoscompte" element={<PageinfosCompte />} />
          <Route path="compte" element={<Compte />} />
		  <Route path="pagearticle" element={<PageArticle />} />
          <Route path="recappanier" element={<RecapPanier />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
