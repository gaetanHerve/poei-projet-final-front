import React, { useEffect, useState } from "react";
import Personne from "../models/Personne";
import "./Compte.css";

function InfosCompte(props) {
  const [personne, setPersonne] = useState<Personne>(props.personne);

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
    body: JSON.stringify(personne),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/patoune-moi/personnes", requestOptions).then(
      (response) => {
        if (response.ok) {
          sessionStorage.setItem("utilisateur", JSON.stringify(personne));
          alert(`Votre compte a été modifié avec succès !`);
        }
      }
    );
  };
  return (
    <>
      {personne && (
        
        <form onSubmit={handleSubmit} className="compte-container-input">
          <div className="compte-container-name">
            <div className="compte-container-label-input">
              <label className="compte-label">Prénom</label>
              <input
                type="text"
                className="compte-input"
                onChange={(e) =>
                  setPersonne({ ...personne, prenom: e.target.value })
                }
                value={personne && personne.prenom}
              />
            </div>
            <div className="compte-container-label-input">
              <label className="compte-label">Nom</label>
              <input
                type="text"
                className="compte-input"
                onChange={(e) =>
                  setPersonne({ ...personne, nom: e.target.value })
                }
                value={personne && personne.nom}
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
                value={personne && personne.password}
                onChange={(e) =>
                  setPersonne({ ...personne, password: e.target.value })
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
                value={personne.complement && personne.complement.telephone}
                onChange={(e) =>
                  setPersonne({
                    ...personne,
                    complement: {
                      ...personne.complement,
                      telephone: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="compte-container-label-input">
              <label className="compte-label">Adresse</label>
              <input
                type="text"
                className="compte-input"
                value={personne.complement && personne.complement.adresse}
                onChange={(e) =>
                  setPersonne({
                    ...personne,
                    complement: {
                      ...personne.complement,
                      adresse: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <input type="submit" className="compte-input-submit" />
        </form>
      )}
    </>
  );
}
export default InfosCompte;
