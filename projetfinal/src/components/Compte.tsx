import React, { useEffect, useState } from "react";
import Personne from "../models/Personne";
import Complement from "../models/ComplementPersonne";
import "./Compte.css";
import ButtonComponent from "./ButtonComponent";

function Compte() {
  const [person, setPerson] = useState({});
  //   const [isformsubmit, setIsFormSubmit] = useState(false);
  // useEffect(() => {

  //     fetch(`http://localhost:8080/patoune-moi/personnes/${id}`).then((res) => res.json()).then(data => setPerson(data));
  //     setIsFormSubmit(false);
  // }, [isformsubmit == true])

  //   const requestOptions = {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(person),
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     fetch("http://localhost:8080/patoune-moi/personnes", requestOptions);
  //     setIsFormSubmit(true);

  const person1 = new Personne();
  person1.nom = "Le Nouail";
  person1.prenom = "Laure";
  person1.id = 12;
  person1.password = "test1";
  const comp = new Complement();
  comp.adresse = "9 rue de la mama";
  comp.telephone = "0606060606";
  person1.complement = comp;
  //   };
  return (
    <div className="compte-container">
      <h1 className="compte-titre">Mon espace</h1>
      <form className="compte-container-input">
        <div className="compte-container-name">
          <div className="compte-container-label-input">
            <label className="compte-label">Prénom</label>
            <input
              type="text"
              className="compte-input"
              placeholder={person1.prenom}
            />
          </div>
          <div className="compte-container-label-input">
            <label className="compte-label">Nom</label>
            <input type="text" className="compte-input" value={person1.nom} />
          </div>
        </div>
        <div className="compte-container-email">
          <div className="compte-container-label-input">
            <label className="compte-label">Login</label>
            <input type="text" className="compte-input" value={person1.id} />
          </div>
          <div className="compte-container-label-input">
            <label>Mot de passe</label>
            <input
              type="password"
              className="compte-input"
              value={person1.password}
            />
          </div>
        </div>
        <div className="compte-container-complement">
          <div className="compte-container-label-input">
            <label className="compte-label">Téléphone</label>
            <input
              type="tel"
              className="compte-input"
              value={person1.complement.telephone}
            />
          </div>
          <div className="compte-container-label-input">
            <label className="compte-label">Adresse</label>
            <input
              type="text"
              className="compte-input"
              value={person1.complement.adresse}
            />
          </div>
        </div>
        {/* <ButtonComponent></ButtonComponent> */}
      </form>
    </div>
  );
}
export default Compte;

function ModifInfo() {}
