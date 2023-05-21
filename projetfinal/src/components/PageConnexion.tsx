import React, { useState } from "react";
import "./PageAccueil.css";
import "./Button.css";
import Personne from "../models/Personne";
import { useNavigate } from "react-router-dom";

function PageConnexion() {
  const navigate = useNavigate();
  const [personne, setPersonne] = useState<Personne>(new Personne());
  const [cnxError, setCnxError] = useState("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      login: personne.login,
      password: personne.password,
    }),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/patoune-moi/login", requestOptions)
      .then((response) => {
        console.log(response);
        return response.ok ? response.json() : Promise.reject(response);
      })
      .then((data) => {
        console.log("data fetched", data);
        sessionStorage.setItem("utilisateur", JSON.stringify(data));
        console.log(sessionStorage.getItem("utilisateur"));
        navigate(-1);
      })
      .catch((error) => {
        let errorBaseMsg = "erreur de connexion :";
        let errorCause: string;
        switch (error.status) {
          case 401:
            errorCause = "mauvais mot de passe";
            break;
          case 404:
            errorCause = "login inconnu";
            break;
          default:
            errorCause = `${errorBaseMsg}`;
        }
        console.error(`${errorBaseMsg} ${errorCause}`);
        setCnxError(errorCause);
      });
  };

  return (
    <div>
      {cnxError !== "" && (
        <div id="cnxError" className="m-5 text-danger">
          {cnxError}
        </div>
      )}
      <div className="card-principal m-5">
        <div className="carte">
          <div className="shadow carte-principal">
            <div className="card-header">
              <h3>Identifiez-vous</h3>
            </div>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="m-3">
                <input
                  type="text"
                  className="form-control mt-3"
                  id="login"
                  placeholder="Login"
                  name="login"
                  onChange={(e) =>
                    setPersonne({ ...personne, login: e.target.value })
                  }
                />
              </div>
              <div className="m-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={(e) =>
                    setPersonne({ ...personne, password: e.target.value })
                  }
                />
              </div>
              <div className="form-check mb-3">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="remember"
                  />{" "}
                  Remember me
                </label>
              </div>
              <button type="submit" className="button-default mb-3">
                Se Connecter
              </button>
              <div className="mb-3">OU</div>
              <a className="nav-link" href="/creercompte">
                <button type="button" className="button-default mb-3">
                  Créer un compte
                </button>
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageConnexion;
