import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTest from "./components/tests/PageTest";
import NavBar from "./components/main/NavBar";
import TestNavbarFooter from "./components/tests/TestNavbarFooter";
import Footer from "./components/main/Footer";
import PageAccueil from "./components/main/PageAccueil";
import PageConnexion from "./components/compte/PageConnexion";
import PageCompagnons from "./components/animal/PageCompagnons";
import PageVueCompagnon from "./components/animal/PageVueCompagnon";
import Compte from "./components/compte/Compte";
import PageCreationUtilisateur from "./components/compte/PageCreationUtilisateur";
import RecapPanier from "./components/panier/RecapPanier";
import PageArticle from "./components/panier/PageArticle";
import PageContact from "./components/main/PageContact";


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
          <Route path="compte" element={<Compte />} />
		      <Route path="pagearticle" element={<PageArticle />} />
          <Route path="recappanier" element={<RecapPanier />} />
          <Route path="contact" element={<PageContact />} />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
