import React, { useEffect, useState } from "react";
import Personne from "../models/Personne";
import Complement from "../models/ComplementPersonne";
import "./Compte.css";
import ButtonComponent from "./ButtonComponent";
import { useNavigate } from "react-router-dom";

function Compte() {
  const navigate = useNavigate();
  const [personne, setPersonne] = useState<Personne>({
    prenom: "Jean",
    nom: "Dupond",
    id: 2,
    login: "test",
    password: "mdp1",
    complement: {
      adresse: "rue du louvre",
      telephone: "0600000001",
      informations: "RAS",
    },
    admin: false,
  });
  const [person, setPerson] = useState({});
  const [deconnected, setDeconnected] = useState(false);
  let deconnectionAsked = false;
  setPerson({ ...person, id: personne.id });

  useEffect(() => {
    if (sessionStorage.getItem("utilisateur")) {
      setPersonne({
        ...JSON.parse(sessionStorage.getItem("utilisateur") ?? ""),
      });
    }
  }, []);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/patoune-moi/personnes", requestOptions).then(
      (response) => {
        if (response.ok) {
          sessionStorage.setItem("utilisateur", JSON.stringify(person));
        }
      }
    );
  };
  return (
    <div className="compte-container">
      <h1 className="compte-titre">Mon espace</h1>
      <form onSubmit={handleSubmit} className="compte-container-input">
        <div className="compte-container-name">
          <div className="compte-container-label-input">
            <label className="compte-label">Prénom</label>
            <input
              type="text"
              className="compte-input"
              onChange={(e) =>
                setPerson({ ...person, ["prenom"]: e.target.value })
              }
              placeholder={personne && personne.prenom}
            />
          </div>
          <div className="compte-container-label-input">
            <label className="compte-label">Nom</label>
            <input
              type="text"
              className="compte-input"
              placeholder={personne && personne.nom}
              onChange={(e) =>
                setPerson({ ...person, ["nom"]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="compte-container-email">
          <div className="compte-container-label-input">
            <label className="compte-label">Login</label>
            <input
              type="text"
              className="compte-input"
              value={personne && personne.login}
            />
          </div>
          <div className="compte-container-label-input">
            <label>Mot de passe</label>
            <input
              type="password"
              className="compte-input"
              placeholder={personne && personne.password}
              onChange={(e) =>
                setPerson({ ...person, ["password"]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="compte-container-complement">
          <div className="compte-container-label-input">
            <label className="compte-label">Téléphone</label>
            <input
              type="tel"
              className="compte-input"
              placeholder={personne && personne.complement.telephone}
              onChange={(e) =>
                setPerson({
                  ...person,
                  ["complement.telephone"]: e.target.value,
                })
              }
            />
          </div>
          <div className="compte-container-label-input">
            <label className="compte-label">Adresse</label>
            <input
              type="text"
              className="compte-input"
              placeholder={personne && personne.complement.adresse}
              onChange={(e) =>
                setPerson({ ...person, ["complement.adresse"]: e.target.value })
              }
            />
          </div>
        </div>
        <input type="submit" className="compte-input-submit" />
      </form>
    </div>
  );
}
export default Compte;
