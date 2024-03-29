import React, { useEffect, useState } from "react";
import { Article } from "../../models/Article";
import CardArticle from "./CardArticle";
import "../../styles/PageAccueil.css";

function PageArticle() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/patoune-moi/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  const articleList = articles.slice(-4);

  return (
    <div className="pageaccueil-container">
      <div className="pageaccueil-titre-container">
        <h1 className="pageaccueil-titre">Ça pourrait vous interesser ...</h1>
      </div>
      { articleList.length > 0 &&
      <CardArticle articleList={articleList}></CardArticle>
      }
    </div>
  );
}

export default PageArticle;
