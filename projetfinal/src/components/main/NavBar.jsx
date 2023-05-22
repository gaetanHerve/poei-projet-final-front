import React, { useState, useEffect } from "react";
import Personne from "../../models/Personne";

function NavBar() {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState({ ...new Personne() });

  useEffect(() => {
    var timerID = setInterval(() => checkConnection(), 500);
    return () => clearInterval(timerID);
  });

  function checkConnection() {
    if (sessionStorage.getItem("utilisateur")) {
      setConnected(true);
      setUser({ ...JSON.parse(sessionStorage.getItem("utilisateur")) });
    }
  }

  const deconnection = () => {
    sessionStorage.removeItem("utilisateur");
    setUser({ ...new Personne() });
  };

  const [animals, setAnimals] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/patoune-moi/animaux")
      .then((res) => res.json())
      .then((data) => setAnimals(data));
  }, []);

  const randomIndex = Math.floor(Math.random() * Object.keys(animals).length);
  const randomAnimal = animals[randomIndex];

  let randomNumber;
  if (randomAnimal && randomAnimal.id) {
    randomNumber = randomAnimal.id;
  }

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-white bg-white">
        <div className="container-fluid">
          <div className="navbar-brand justify-content-end">
            <img src="/assets/animals.png" alt="logo" />
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
                <a className="nav-link" href={`/findbyid/${randomNumber}`}>
                  Au hasard ?
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-brand justify-content-end">
            <ul className="navbar-nav me-auto">
              {!connected && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/connexion">
                      <img
                        src="/assets/user.png"
                        height="30px"
                        alt="mon compte"
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    <img src="/assets/blank.png" height="30px" alt="" />
                  </li>
                </>
              )}
              {connected && (
                <>
                  <li className="nav-item m-1">Bienvenue, {user.login}</li>
                  <li className="nav-item">
                    <a className="nav-link" href="/compte">
                      <img
                        src="/assets/connectedUser.png"
                        height="30px"
                        alt="mon compte"
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      <img
                        src="/assets/deconnexion.png"
                        height="30px"
                        onClick={deconnection}
                        alt="deconnexion"
                      />
                    </a>
                  </li>
                  {user.admin && (
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="http://localhost:8080/patoune-moi/animauxpage/findall"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/assets/admin.png"
                          height="30px"
                          alt="administration"
                        />
                      </a>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
