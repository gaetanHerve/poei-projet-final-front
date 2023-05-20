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
  
  const afficherDetails = (commande) => {
    let details = commande.listeLignes;
    console.log(details);
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
                <th>Infos</th>
                <th id="facture" onClick={(e) => sort(e)} >Facturée</th>
            </tr>
            </thead>
            <tbody>    
                {commandes.length > 0 && commandes.map((commande) =>
                    <tr key={commande.id}>
                        <td>{ commande.id }</td>
                        <td>{ commande.prixTotal }</td>
                        <td>{ commande.jour }</td>
                        <td>{ commande.infos }</td>
                        <td>{ commande.facture }</td>
                        <td><input
                          type="button"
                          className="compte-commands-display m-2"
                          value={"AfficherDétails"}
                          onClick={e => afficherDetails({commande})}></input>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    }
    </>
  );
}

export default HistoriqueCommandes;
