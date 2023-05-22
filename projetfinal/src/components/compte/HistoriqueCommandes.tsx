import React, { useEffect, useState } from "react";
import "../../styles/PageAccueil.css";
import ICommande from "../../models/ICommande";
import { Panier } from "../../models/Panier";
import DetailCommande from "./DetailCommande";

function HistoriqueCommandes({utilisateur}) {
  const emptyPanier = {listeLignes: [], prixTotalFacture: 0, nomClient: "", idAnimal: 0};
  const [commandes, setCommandes] = useState<ICommande[]>([]);
  const [details, setDetails] = useState<Panier>(emptyPanier);
  const [detailsDisplayIndex, setDetailsDisplayIndex] = useState(-1);

  useEffect( () => {
    fetch(`http://localhost:8080/patoune-moi/commandes/findbyclient/${utilisateur.id}`).then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
      }
    )
    .then(data => {      
      setCommandes([...data]);
    });
  }, [utilisateur]);
  
  const afficherDetails = (index, commande) => {
    if (index === detailsDisplayIndex) {
      setDetailsDisplayIndex(-1);
      setDetails({...emptyPanier, jour: ""});
    } else {
      setDetailsDisplayIndex(index);
      if (commande.infos && commande.infos !== "") {
        let commandeDetails = JSON.parse(commande.infos);
        setDetails(commandeDetails)
        setDetails({...commandeDetails, jour:commande.jour})
      }
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
                          value={(detailsDisplayIndex === index) ? "Masquer" : "Afficher"}
                          onClick={(e) => {
                            afficherDetails(index, commande);
                          }}></input>
                        </td>
                        {/* <td>{ commande.infos }</td> */}
                    </tr>
                )}
            </tbody>
        </table>
        { details && details.listeLignes.length > 0 &&
          <DetailCommande details={details}></DetailCommande>
        }
    </div>
    }
    </>
  );
}

export default HistoriqueCommandes;
