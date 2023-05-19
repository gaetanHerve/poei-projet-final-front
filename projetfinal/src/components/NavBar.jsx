import React, { useState, useEffect } from "react";
import Personne from "../models/Personne";

function NavBar() {
  const [personne, setPersonne] = useState({...new Personne()});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
      setConnected(true);
      console.log("connected");
      setPersonne({...JSON.parse(sessionStorage.getItem("utilisateur"))});
  }, []);

  const deconnection = () => {
    sessionStorage.removeItem("utilisateur");
    setPersonne({...new Personne()});
    setConnected(false);
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-white bg-white">
        <div className="container-fluid">
          <div className="navbar-brand justify-content-end">
            <img src="assets/animals.png" alt="logo" />
          </div>
          <a className="navbar-brand" href="/">
            Patoûne-moi
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/noscompagnons">
                  Nos Compagnons<span className="sr-only"></span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  Au hasard ?
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  Contact
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  FAQ
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="">
                      Cadre de vie
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="">
                      Alimentation
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {!connected && (
            <div className="navbar-item justify-content-end">
              <a className="nav-link" href="/connexion">
                <img src="assets/user.png" height="30px" alt="mon compte" />
              </a>
            </div>
          )}
          {connected && (
            <div className="navbar-item justify-content-end">
              <div>{personne && personne.login}</div>
              <div>
                <button className="button-default mb-3" onClick={deconnection}>
                  Se Déconnecter
                </button>
              </div>
              <div>
                <a className="nav-link" href="/compte">
                  <img
                    src="assets/connectedUser.png"
                    height="30px"
                    alt="mon compte"
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
