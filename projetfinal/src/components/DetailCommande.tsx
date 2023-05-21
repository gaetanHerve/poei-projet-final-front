import React, { useEffect, useState } from "react";
import { Animal } from "../models/Animal";
import { Ligne } from "./Panier";

const DetailCommande = (props) => {
  const details = props.details;
  const [animal, setAnimal] = useState<Animal>(new Animal())

  useEffect(() => {
    fetch(`http://localhost:8080/patoune-moi/animaux/${details.idAnimal}`)
    .then( (response) => {
      if (response.ok)
        return response.json()
    })
    .then( (data) => {
      setAnimal(data);
    })
    .catch (error => console.log(error));
  });

  return (
    <>
      {/* <div className="card"> TODO=> make a card great again*/}

      <h4>Commande du {details.jour} | Prix total : {details.prixTotalFacture}€</h4>
      { animal && 
        <h4>Adoption de {animal.nom} ({animal.prix}€)</h4>
      }
      
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
          {details.listeLignes.length > 0 && details.listeLignes.map((ligne:Ligne, index: number) =>
            <tr key={index}>
              <td>{ligne.id}</td>
              <td>{ligne.nom}</td>
              <td>{ligne.prix}€</td>
              <td>{ligne.quantite}</td>
              <td>{ligne.prix * ligne.quantite}€</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* </div> */}
    </>
  )
}

export default DetailCommande;
