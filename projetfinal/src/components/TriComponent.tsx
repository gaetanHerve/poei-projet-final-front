import React from "react";
import { useState } from "react";
import CardComponent from "./CardComponent";

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
      (maxPrix === "" || animal.price <= parseInt(maxPrix))
    );
  });

  const updateFilters = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="chat"
            // name="espece"
            checked={filters.espece === "chat"}
            onChange={() => updateFilters("espece", "chat")}
          />
          Chat
        </label>
        <label>
          <input
            type="radio"
            value="chien"
            // name="espece"
            checked={filters.espece === "chien"}
            onChange={() => updateFilters("espece", "chien")}
          />
          Chien
        </label>
        <label>
          <input
            type="radio"
            value="all"
            // name="espece"
            checked={filters.espece === "all"}
            onChange={() => updateFilters("espece", "all")}
          />
          Tous
        </label>

        <label>
          <input
            type="radio"
            value="Male"
            // name="sexe"
            checked={filters.sexe === "Male"}
            onChange={() => updateFilters("sexe", "Male")}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="Femelle"
            // name="sexe"
            checked={filters.sexe === "Femelle"}
            onChange={() => updateFilters("sexe", "Femelle")}
          />
          Femelle
        </label>
        <label>
          <input
            type="radio"
            value="all"
            // name="sexe"
            checked={filters.sexe === "all"}
            onChange={() => updateFilters("sexe", "all")}
          />
          Tous
        </label>
      </div>

      <h4>Filtrer par prix :</h4>
      <div>
        <label>
          Prix minimum :
          <input
            type="number"
            value={filters.minPrix}
            onChange={(e) => updateFilters("minPrix", e.target.value)}
          />
        </label>
        <label>
          Prix maximum :
          <input
            type="number"
            value={filters.maxPrix}
            onChange={(e) => updateFilters("maxPrix", e.target.value)}
          />
        </label>
      </div>
      <CardComponent animalList={filteredData}></CardComponent>
    </div>
  );
}

export default TriComponent;
