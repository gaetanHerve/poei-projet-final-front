import React from "react";
import ButtonComponent from "./ButtonComponent";
import "./Card.css";

function CardComponent({ animalList }) {
  const MAX_LENGTH = 70;
  return (
    <div className="card-principal">
      {animalList.length > 0 &&
        animalList.map((animal, index) => (
          <div key={animal.id} className="carte">
            <div className="shadow carte-principal">
              <img
                src={`assets/${animal.urlImage}`}
                className="card-image-animal"
              />
              <div className="card-container-text">
                <h4 className="card-nom">{animal.nom}</h4>
                <div className="card-information">
                  <div className="card-information-gender">
                    <img
                      className="card-information-logo"
                      src="assets/gender.png"
                    />
                    <p className="card-information-text">{animal.sexe}</p>
                  </div>

                  <div className="card-information-age">
                    <img
                      className="card-information-logo"
                      src="assets/calendar.png"
                    />
                    <p className="card-information-text">{animal.age} an(s)</p>
                  </div>
                  <div className="card-information-prix">
                    <img
                      className="card-information-logo"
                      src="assets/prix.png"
                    />
                    <p className="card-information-text card-information-text-prix">
                      {animal.prix} €
                    </p>
                  </div>
                </div>
                { animal.complement && animal.complement.informations &&
                <p className="card-text-description">{`${animal.complement.informations.substring(
                  0,
                  MAX_LENGTH
                )}...`}</p>
                }
                <div className="card-button">
                  <ButtonComponent
                    lien={`/findbyid/${animal.id}`}
                    text="Voir sa fiche"
                    handleOnClick={() => {}}
                  ></ButtonComponent>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CardComponent;
