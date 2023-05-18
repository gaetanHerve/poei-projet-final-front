import React, { useState } from "react";
import "./PageAccueil.css";
import "./Button.css";
import Personne from '../models/Personne'
import { useNavigate } from "react-router-dom";


function PageCreationUtilisateur() {
  const navigate = useNavigate();
  const [personne, setPersonne] = useState<Personne>({...new Personne(), id: 0, admin: false});

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(personne)
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(personne);
    fetch('http://localhost:8080/patoune-moi/personnes', requestOptions)
    .then( response => {
      console.log(response);
      if (response.ok) {
        console.log("personne created");
        alert(`Bienvenue ${personne.prenom}, votre compte à été créé avec succès`);
        navigate('/');
      }
    })
    .catch( error => {
      console.log("error", error);
    });
  }

  return (
    <div>
      <div className="card-principal m-5">
        <div className="carte">
          <div className="shadow carte-principal">
            <div className="card-header"><h3>Créer un compte</h3></div>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="m-3">
                {/* <label htmlFor="nom">Nom :</label> */}
                <input
                  type="text"
                  className="form-control mt-3"
                  id="nom"
                  placeholder="Nom"
                  name="nom"
                  onChange={(e) => setPersonne({ ...personne, nom: e.target.value })}
                />
              </div>
							<div className="m-3">
                {/* <label htmlFor="prenom">Prénom :</label> */}
                <input
                  type="text"
                  className="form-control mt-3"
                  id="prenom"
                  placeholder="Prénom"
                  name="prenom"
                  onChange={(e) => setPersonne({ ...personne, prenom: e.target.value })}
                />
              </div>
							<div className="m-3">
                {/* <label htmlFor="adresse">Adresse :</label> */}
                <input
                  type="text"
                  className="form-control mt-3"
                  id="adresse"
                  placeholder="Adresse"
                  name="adresse"
                  onChange={(e) => setPersonne({...personne, complement: {...personne.complement, adresse: e.target.value }})}
                />
              </div>
							<div className="m-3">
                {/* <label htmlFor="telephone">Téléphone :</label> */}
                <input
                  type="text"
                  className="form-control mt-3"
                  id="telephone"
                  placeholder="Téléphone"
                  name="telephone"
                  onChange={(e) => setPersonne({...personne, complement: {...personne.complement, telephone: e.target.value }})}
                />
              </div>
							<div className="m-3">
                {/* <label htmlFor="informations">Informations :</label> */}
                <input
                  type="textarea"
                  className="form-control mt-3"
                  id="informations"
                  placeholder="Informations"
                  name="informations"
                  onChange={(e) => setPersonne({...personne, complement: {...personne.complement, informations: e.target.value }})}
                />
              </div>
              <div className="m-3">
                {/* <label htmlFor="password">Mot de passe :</label> */}
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={(e) => setPersonne({ ...personne, password: e.target.value })}
                />
              </div>
              <div className="form-check mb-3">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" name="remember"/> Remember me
                </label>
              </div>
              <button type="submit" className="button-default mb-3">Submit</button>
            </form>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default PageCreationUtilisateur;
