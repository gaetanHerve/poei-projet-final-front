import React, { useEffect, useState } from "react";
import { Animal } from "../models/Animal";
import CardComponent from "./CardComponent";
import "./PageCompagnons.css";
import TriComponent from "./TriComponent";

function PageCompagnons() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/patoune-moi/animaux")
      .then((res) => res.json())
      .then((data) => setAnimals(data));
  }, []);

  return (
    <div className="pagecompagnons-container">
      <div className="pagecompagnons-titre-container">
        <h1 className="pagecompagnons-titre">Nos Compagnons</h1>
      </div>
      <TriComponent tableauAnimal={animals}></TriComponent>
    </div>
  );
}

export default PageCompagnons;
