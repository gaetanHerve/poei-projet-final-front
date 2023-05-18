import React, { useState } from "react";
import "./PageAccueil.css";
import "./Button.css";
import Personne from '../models/Personne'
import { useNavigate } from "react-router-dom";
import Complement from "../models/ComplementPersonne";


function PageCreationUtilisateur() {
  const generateId = () => { return Math.floor(Math.random()*10000 + 1); }
  const navigate = useNavigate();
  const [cnxError, setCnxError] = useState("");
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
      }
    })
    .then( data => {
      // console.log("personne created");
      // sessionStorage.setItem("utilisateur", JSON.stringify(data));
      // console.log(sessionStorage.getItem("utilisateur"));
      // navigate("/");
    })
    .catch( error => {
      console.log("error", error);
    });
  }

  return (
    <div>
      { cnxError !== "" &&
        
        <div id="cnxError" className="m-5 text-danger">
          {cnxError}
        </div>
      }
      <div className="card-principal m-5">
        <div className="carte">
          <div className="shadow carte-principal">
            <div className="card-header">Créer un compte</div>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="m-3">
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
                <input
                  type="textare"
                  className="form-control mt-3"
                  id="informations"
                  placeholder="Informations"
                  name="informations"
                  onChange={(e) => setPersonne({...personne, complement: {...personne.complement, informations: e.target.value }})}
                />
              </div>
              <div className="m-3">
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
