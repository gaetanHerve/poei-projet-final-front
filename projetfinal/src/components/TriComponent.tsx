import React from "react";
import { useState } from "react";
import CardComponent from "./CardComponent";
import "./Tri.css";

function TriComponent({ tableauAnimal }) {
  const [filters, setFilters] = useState({
    espece: "all",
    sexe: "all",
    minPrix: "",
    maxPrix: "",
  });

  const filteredData = tableauAnimal.filter((animal) => {
    const { espece, sexe, minPrix, maxPrix } = filters;
    return (
      (espece === "all" || animal.espece === espece) &&
      (sexe === "all" || animal.sexe === sexe) &&
      (minPrix === "" || animal.prix >= parseInt(minPrix)) &&
      (maxPrix === "" || animal.prix <= parseInt(maxPrix))
    );
  });

  const updateFilters = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <>
      <div className="tri-container">
        <div className="tri-container-button">
          <h4>Espèce</h4>
          <div>
            <label className="tri-button-radio-label">
              <input
                className="tri-button-radio"
                type="radio"
                value="Chat"
                // name="espece"
                checked={filters.espece === "Chat"}
                onChange={() => updateFilters("espece", "Chat")}
              />
              <p className="tri-button-radio-p">Chat</p>
            </label>
            <label className="tri-button-radio-label">
              <input
                className="tri-button-radio"
                type="radio"
                value="Chien"
                // name="espece"
                checked={filters.espece === "Chien"}
                onChange={() => updateFilters("espece", "Chien")}
              />
              <p className="tri-button-radio-p">Chien</p>
            </label>
            <label className="tri-button-radio-label">
              <input
                className="tri-button-radio"
                type="radio"
                value="all"
                // name="espece"
                checked={filters.espece === "all"}
                onChange={() => updateFilters("espece", "all")}
              />
              <p className="tri-button-radio-p">Tous</p>
            </label>
          </div>
        </div>
        <div className="tri-container-button">
          <h4>Sexe</h4>
          <div>
            <label className="tri-button-radio-label">
              <input
                className="tri-button-radio"
                type="radio"
                value="Male"
                // name="sexe"
                checked={filters.sexe === "Male"}
                onChange={() => updateFilters("sexe", "Male")}
              />
              <p className="tri-button-radio-p">Mâle</p>
            </label>
            <label className="tri-button-radio-label">
              <input
                className="tri-button-radio"
                type="radio"
                value="Femelle"
                // name="sexe"
                checked={filters.sexe === "Femelle"}
                onChange={() => updateFilters("sexe", "Femelle")}
              />
              <p className="tri-button-radio-p">Femelle</p>
            </label>
            <label className="tri-button-radio-label">
              <input
                className="tri-button-radio"
                type="radio"
                value="all"
                // name="sexe"
                checked={filters.sexe === "all"}
                onChange={() => updateFilters("sexe", "all")}
              />
              <p className="tri-button-radio-p">Tous</p>
            </label>
          </div>
        </div>

        <div className="tri-container-button">
          <h4>Prix</h4>
          <div>
            <label className="tri-prix-label">
              Minimum :
              <input
                className="tri-button-number"
                type="number"
                value={filters.minPrix}
                onChange={(e) => updateFilters("minPrix", e.target.value)}
              />
            </label>
            <label className="tri-prix-label">
              Maximum :
              <input
                className="tri-button-number"
                type="number"
                value={filters.maxPrix}
                onChange={(e) => updateFilters("maxPrix", e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="tri-card">
        <CardComponent animalList={filteredData}></CardComponent>
      </div>
    </>
  );
}

export default TriComponent;
