import React, { useEffect, useState } from "react";
import "./PageAccueil.css";
import ICommande from "../models/ICommande";
import { Panier, Ligne} from "./Panier";

function HistoriqueCommandes({utilisateur}) {
  const [commandes, setCommandes] = useState<ICommande[]>([]);
  const [details, setDetails] = useState<Panier>({listeLignes: [], prixTotalFacture: 0});

  useEffect( () => {
    fetch(`http://localhost:8080/patoune-moi/commandes/findbyclient/${utilisateur.id}`).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
      }
    )
    .then(data => {
      console.log("commandes: ", data);
      setCommandes([...data]);
    });
  }, [utilisateur]);
  
  const afficherDetails = (e, commande) => {
    if (commande.infos && commande.infos != "") {
      let commandeDetails = JSON.parse(commande.infos);
      setDetails(commandeDetails)
      setDetails({...commandeDetails, jour:commande.jour})
      console.log(details);
    } else {
      setDetails({listeLignes: [], prixTotalFacture: 0});
    }
  };

  const sort = (event) => {
    let sortAttr = event.target.id;
    console.log(sortAttr)
    setCommandes([...commandes].sort((a:ICommande, b:ICommande) => {
        return a[sortAttr] - b[sortAttr];
    }));
  }

  return (
    <>
    { commandes &&
    <div className="container mt-3">
        <h2>Commandes</h2>   
        <table className="table table-striped">
            <thead>
            <tr>
                <th id="id" onClick={(e) => sort(e)}>Id</th>
                <th id="prixTotal" onClick={(e) => sort(e)}>Prix</th>
                <th>Date</th>
                <th id="facture" onClick={(e) => sort(e)} >Facturée</th>
                <th>Détail</th>
            </tr>
            </thead>
            <tbody>    
                {commandes.length > 0 && commandes.map((commande, index) =>
                    <tr key={index}>
                        <td>{ commande.id }</td>
                        <td>{ commande.prixTotal }</td>
                        <td>{ commande.jour }</td>
                        <td>{ commande.facture ? "oui" : "non" }</td>
                        <td><input
                          type="button"
                          className="compte-commands-display m-2"
                          value={"Afficher"}
                          onClick={(e) => {
                            afficherDetails(e, commande);
                          }}></input>
                        </td>
                        {/* <td>{ commande.infos }</td> */}
                    </tr>
                )}
            </tbody>
        </table>
        { details && details.listeLignes.length > 0 &&
        <>
        {/* <div className="card"> TODO=> make a card great again*/}
        <h4>Commande du {details.jour}</h4>
        <h4>Prix total commande : {details.prixTotalFacture}€</h4>
        <table className="table table-striped">
             
          <thead>
          <tr>
            <th>Id</th>
            <th>nom</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Prix * quantité</th>
          </tr>
          </thead>
          <tbody>    
              {details.listeLignes.length > 0 && details.listeLignes.map((ligne, index) =>
                  <tr key={index}>
                      <td>{ ligne.id }</td>
                      <td>{ ligne.nom }</td>
                      <td>{ ligne.prix }€</td>
                      <td>{ ligne.quantite }</td>
                      <td>{ ligne.prix }€</td>
                  </tr>
              )}
          </tbody>
        </table>
        {/* </div> */}
        </>
        }
    </div>
    }
    </>
  );
}

export default HistoriqueCommandes;
