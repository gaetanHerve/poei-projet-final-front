import React, { useEffect, useState } from "react";
import { Animal } from "../models/Animal";
import Entete from "./Entete";
import CardComponent from "./CardComponent";
import "./PageAccueil.css";
import CompagnyDescription from "./CompagnyDescription";

function PageAccueil() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/patoune-moi/animaux")
      .then((res) => res.json())
      .then((data) => setAnimals(data));
  }, []);

  const animalList = animals.slice(-4);

  return (
    <>
      <Entete></Entete>

      <div className="pageaccueil-container">
        <div className="pageaccueil-titre-container">
          <h1 className="pageaccueil-titre">Les derniers arrivants</h1>
        </div>
        <CardComponent animalList={animalList}></CardComponent>
      </div>

      <CompagnyDescription></CompagnyDescription>
    </>
  );
}

export default PageAccueil;
