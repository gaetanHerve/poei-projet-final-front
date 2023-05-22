import React, { useEffect, useState } from "react";
import { Animal } from "../../models/Animal";
import { Ligne } from "../../models/Panier";
import "../../styles/Card.css";

const DetailCommande = (props) => {
  const MAX_LENGTH = 70;
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
  }, [details.idAnimal]);

  return (
    <>
    <h3 className="card-title">Adoption de {animal.nom}, le {details.jour} | Prix total : {details.prixTotalFacture}€</h3>
    <div className="container">
      <div className="row">
        <div className="card-principal col-4">
          <div key={animal.id} className="carte">
            <div className="shadow carte-principal">
              <img
                src={`assets/${animal.urlImage}`}
                className="card-image-animal"
                alt={animal.nom}
              />
              <div className="card-container-text">
                <h4 className="card-nom">{animal.nom}</h4>
                <div className="card-information">
                  <div className="card-information-gender">
                    <img
                      className="card-information-logo"
                      src="assets/gender.png"
                      alt={animal.sexe}
                    />
                    <p className="card-information-text">{animal.sexe}</p>
                  </div>

                  <div className="card-information-age">
                    <img
                      className="card-information-logo"
                      src="assets/calendar.png"
                      alt="age"
                    />
                    <p className="card-information-text">{animal.age} an(s)</p>
                  </div>
                  <div className="card-information-prix">
                    <img
                      className="card-information-logo"
                      src="assets/prix.png"
                      alt="devise"
                    />
                    <p className="card-information-text card-information-text-prix">
                      {animal.prix} €
                    </p>
                  </div>
                </div>
                { animal.complement && animal.complement.informations &&
                <p className="card-text-description">{`${animal.complement.informations.substring(
                  0,
                  MAX_LENGTH
                )}...`}</p>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="card-secondary col-8" style={{minWidth:"60%"}}>
          <div className="carte">
            <div className="shadow carte-secondary">
              <h5 className="card-title">Articles additionnels</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    {/* <th>Id</th> */}
                    <th>nom</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {details.listeLignes.length > 0 && details.listeLignes.map((ligne:Ligne, index: number) =>
                    <tr key={index}>
                      {/* <td>{ligne.id}</td> */}
                      <td>{ligne.nom}</td>
                      <td>{ligne.prix}€</td>
                      <td>{ligne.quantite}</td>
                      <td>{ligne.prix * ligne.quantite}€</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default DetailCommande;
