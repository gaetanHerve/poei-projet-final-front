import React, { useEffect, useState } from "react";
import "./PageAccueil.css";
import "./Button.css";
import Personne from '../models/Personne'
import { useNavigate } from "react-router-dom";


function PageinfosCompte() {
  const navigate = useNavigate();
  const [personne, setPersonne] = useState<Personne>();
  const [deconnected, setDeconnected] = useState(false);
  let deconnectionAsked = false;

  useEffect(() => {
    if (sessionStorage.getItem('utilisateur')) {
        setPersonne({...JSON.parse(sessionStorage.getItem('utilisateur') ?? "")});
    }
  }, []);

  // useEffect(() => {
  //   if (deconnectionAsked) {
  //     navigate("/");
  //   }
  // }, [deconnected, navigate]);

  const deconnection = () => {
    sessionStorage.removeItem('utilisateur');
    deconnectionAsked = true;
    setDeconnected(true);
    navigate("/");
  }
  
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(personne);
  //   fetch('http://localhost:8080/patoune-moi/personnes', requestOptions)
  //   .then( response => {
  //     console.log(response);
  //     if (response.ok) {
  //       console.log("personne created");
  //       alert(`Bienvenue ${personne.prenom}, votre compte à été créé avec succès`);
  //       navigate('/');
  //     }
  //   })
  //   .catch( error => {
  //     console.log("error", error);
  //   });
  // }

  return (
    <div>
      <div className="card-principal m-5">
        <div className="carte">
          <div className="shadow carte-principal">
            <br/>
            <div className="card-header"><h3>Vos informations</h3></div>
            { personne &&
              <div id="infos">
                <div className="m-3">
                  Nom : {personne.nom} 
                </div>
                <div className="m-3">
                  Prénom : {personne.prenom}
                </div>
                <div className="m-3">
                  Adresse : {personne.complement.adresse}
                </div>
                <div className="m-3">
                  Téléphone : {personne.complement.telephone}
                </div>
                <div className="m-3">
                  Informations : {personne.complement.informations}
                </div>
                <button className="button-default mb-3" onClick={deconnection}>Se Déconnecter</button>
                <br/>
              </div>
            }
          </div>
        </div>
      </div> 
    </div>
  )
}

export default PageinfosCompte;
