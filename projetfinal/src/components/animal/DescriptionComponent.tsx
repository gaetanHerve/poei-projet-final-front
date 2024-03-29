import React, { useEffect, useState } from "react";
import "../../styles/PageAccueil.css";
import "../../styles/DescriptionComponent.css";
import "../../styles/Button.css";
import ButtonComponent from "../utils/ButtonComponent";
import { useNavigate } from "react-router-dom";
import Personne from "../../models/Personne";

function DescriptionComponent({ animal }) {
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("utilisateur")) {
      setConnected(true);
    }
  });

  const handleClick = () => {
    if (connected) {
      sessionStorage.setItem("animal", JSON.stringify(animal));
      sessionStorage.setItem(
        "client",
        JSON.stringify(sessionStorage.getItem("utilisateur"))
      );
      navigate("/pagearticle");
    } else if (!connected) {
      navigate("/connexion");
    }
  };
  return (
    <div className="description-card-container">
      <div className="description-container">
        <div className="frame-general-css-title">
          <p className="description-title">{animal && animal.nom}</p>
        </div>
        <div className="description-texte">
          <div className="Container-unprice">
            <div className="description-logo">
              <img
                className="logo-css"
                src="../assets/gender.png"
                alt="gender"
              />
              <img
                className="logo-css"
                src="../assets/calendar.png"
                alt="calendrier"
              />
              <img className="logo-css" src="../assets/poids.png" alt="poids" />
              <img
                className="logo-css"
                src="../assets/endroit48.png"
                alt="endroit"
              />
            </div>
            <div className="decrip-texte">
              <div className="texte-css">{animal && animal.sexe}</div>
              <div className="texte-css">{animal && animal.age} an(s)</div>
              <div className="texte-css">{animal && animal.poids} kg</div>
              <div className="texte-css">{animal && animal.localisation}</div>
            </div>
          </div>
          <div className="decription-prix">
            <div>
              <img
                className="logo-css-price"
                src="../assets/prix.png"
                alt="€"
              />
            </div>
            <div className="texte-css texte-css-prix">
              {" "}
              {animal && animal.prix} €
            </div>
          </div>
          <div className="button-description-css">
            <ButtonComponent
              handleOnClick={handleClick}
              text={"Adopter"}
              lien={""}
            ></ButtonComponent>
          </div>
        </div>
      </div>
      <div className="frame-container">
        <div className="frame-general-css">
          <div>Je suis un {animal && animal.espece}</div>
        </div>
        <div className="frame-general-css">
          <div>De la race des {animal && animal.race}</div>
        </div>
        <div className="frame-general-css">
          {animal && animal.complement && animal.complement.vaccin === true ? (
            <div>Mes vaccins sont à jours</div>
          ) : (
            <div>Je ne suis pas vacciné(e)</div>
          )}
        </div>
        <div className="frame-general-css">
          <div>
            {animal && animal.complement.sterilise === true ? (
              <div>Je suis stérilisé(e)</div>
            ) : (
              <div>Je ne suis pas stérilisé(e)</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionComponent;
