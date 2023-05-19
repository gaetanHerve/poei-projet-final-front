import React, { useEffect, useState } from "react";
import { Article } from "./Article";
import Entete from "./Entete";
import CardArticle from "./CardArticle";
import "./PageAccueil.css";

function PageArticle() {
    
  const article1 = new Article();
  article1.id = 1;
  article1.nom = "Nourriture Chien";
  article1.prix = 15;
  article1.urlImage = "Donnez le meilleur à votre futur chiot";
  article1.description = "";

  const article2 = new Article();
  article2.id = 2;
  article2.nom = "Balle";
  article2.prix = 5;
  article2.urlImage = "balle.jpg";
  article2.description = "Une balle, tout ce qu'il y a de plus classique.";

  const article3 = new Article();
  article3.id = 3;
  article3.nom = "Nourriture Chat";
  article3.prix = 15;
  article3.urlImage = "nourriture_chat.jpg";
  article3.description = "Donnez le meilleur à votre futur chat.";

  const article4 = new Article();
  article4.id = 4;
  article4.nom = "Caisse";
  article4.prix = 25;
  article4.urlImage = "caisse.jpg";
  article4.description = "Transportez votre animal partout avec vous.";

  const article5 = new Article();
  article5.id = 5;
  article5.nom = "Brosse";
  article5.prix = 5;
  article5.urlImage = "brosse.jpg";
  article5.description = "Pour rendre son pelage soyeux.";

  const articles = [article1, article2, article3, article4, article5];

  const articleList = articles.slice(-4);

  return (
      <div className="pageaccueil-container">
        <div className="pageaccueil-titre-container">
          <h1 className="pageaccueil-titre">Ça pourrait vous interesser ...</h1>
        </div>
        <CardArticle articleList={articleList}></CardArticle>
      </div>
  );
}

export default PageArticle;
