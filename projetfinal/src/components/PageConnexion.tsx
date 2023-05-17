import React, { useState } from "react";
import "./PageAccueil.css";
import Personne from '../models/Personne'

function PageConnexion() {
  const [personne, setPersonne] = useState<Personne>(new Personne());

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"id": personne.id, "password": personne.password})
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    fetch('http://localhost:8080/patoune-moi/login', requestOptions).then( res => res.json())
    .then( data => {
      console.log("data fetched", data);
      sessionStorage.setItem("utilisateur", JSON.stringify(data));
    });
  }

  return (
    <>
      <div className="card-principal m-5">
        <div className="carte">
          <div className="shadow carte-principal">
            <div className="card-header">Identifiez-vous</div>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="m-3">
                {/* <label htmlFor="id" className="form-label m-3">Login (id) :</label> */}
                <input
                  type="text"
                  className="form-control mt-3"
                  id="id"
                  placeholder="Login"
                  name="id"
                  onChange={(e) => setPersonne({ ...personne, id: Number(e.target.value) })}
                />
              </div>
              <div className="m-3">
                {/* <label htmlFor="password" className="form-label mb-3">Password:</label */}
                <input
                  type="password"
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
              <button type="submit" className="btn btn-primary mb-3">Submit</button>
            </form>
          </div>
        </div>
      </div> 
    </>
  )
}

export default PageConnexion;
