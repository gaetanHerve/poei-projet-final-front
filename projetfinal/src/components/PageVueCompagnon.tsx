import React, { useEffect, useState } from "react";
import { Animal } from "../models/Animal";
import DescriptionComponent from "./DescriptionComponent";
import "./PageAccueil.css";
import "./PageVueCompagnon.css";
import { useParams } from "react-router-dom";

function PageVueCompagnon() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<Animal>();
  useEffect(() => {
    fetch(`http://localhost:8080/patoune-moi/animaux/${id}`)
      .then((res) => res.json())
      .then((data) => setAnimal(data));
  }, []);

  return (
    <div className="position-item">
      <div className="position-container-blank">
        <div className="container-general-page">
          <div className="picture-container">
            <div className="picture-container-position">
              <img
                className="picture-constrain"
                src={`../assets/${animal && animal.urlImage}`}
                alt="photo de chien"
              />
            </div>
            <div className="details-container-bottom">
              <div className="details-container">
                <div className="object-title-separator">
                  <h2 className="details-title-description">Description</h2>
                  <hr className="separator" />
                </div>
                <div className="text-details-improvement">
                  {animal?.complement && animal.complement.informations}
                </div>
              </div>
            </div>
          </div>
          <DescriptionComponent animal={animal}></DescriptionComponent>
        </div>
      </div>
      <div className="position-details"></div>
    </div>
  );
}

export default PageVueCompagnon;
