import React, { useEffect, useState } from "react";
import Personne from "../../models/Personne";
import "../../styles/Compte.css";
import HistoriqueCommandes from "./HistoriqueCommandes";
import InfosCompte from "./InfosCompte";

function Compte() {
  const [personne, setPersonne] = useState<Personne>();
  const [afficherCommandes, setAfficherCommandes] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("utilisateur")) {
      setPersonne({
        ...JSON.parse(sessionStorage.getItem("utilisateur") ?? ""),
      });
    }
  }, []);

  const handleDisplaySelection = (e) => {
    let titreInfos = document.getElementById("titreInfos") ?? new HTMLElement();
    let titreCommandes = document.getElementById("titreCommandes") ?? new HTMLElement();
    if (e.target.id === "titreInfos") {
      titreInfos.classList.add("compte-titre-selected");
      titreCommandes.classList.remove("compte-titre-selected");
    } else {
      titreCommandes.classList.add("compte-titre-selected");
      titreInfos.classList.remove("compte-titre-selected");
    }
  }

  return (
    <div className="compte-container">
      <h1 id="titreInfos" className="compte-titre"
        onClick={(e) => {
          setAfficherCommandes(false);
          handleDisplaySelection(e);
        }}>
          Mes infos
      </h1>
      <h1 style={{display: "inline-block"}}>|</h1>
      <h1 id="titreCommandes" className="compte-titre compte-titre-selected"
        onClick={(e) => {
          setAfficherCommandes(true);
          handleDisplaySelection(e);
        }}>
          Mes Commandes
      </h1>
      {personne && !afficherCommandes && (
        <>
        <InfosCompte personne={personne}></InfosCompte>
        
        </>
      )}
      { personne && afficherCommandes &&
        <HistoriqueCommandes utilisateur={personne}/>
      }
    </div>
  );
}
export default Compte;
