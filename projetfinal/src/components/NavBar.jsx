import React from "react";

function NavBar() {
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
                <a className="nav-link" href="/">
                  Animaux en adoption<span className="sr-only"></span>
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
        </div>
      </nav>
    </>
  );
}

export default NavBar;
