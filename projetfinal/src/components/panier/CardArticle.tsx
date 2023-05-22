import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../utils/ButtonComponent";
import "../../styles/Card.css";
import { useState, useEffect } from "react";
import { Panier, Ligne } from "../../models/Panier";
import { Animal } from "../../models/Animal";
import Personne from "../../models/Personne";

function CardArticle({ articleList }) {
  const MAX_LENGTH = 70;

  const [animal, setAnimal] = useState<Animal>({
    id: 0,
    nom: "",
    race: "",
    espece: "",
    age: 0,
    poids: 0,
    sexe: "",
    localisation: "",
    urlImage: "",
    prix: 0,
    complement: { vaccin: false, sterilise: true, informations: "" },
    status: "",
  });

  const [client, setClient] = useState<Personne>({
    id: 0,
    login: "",
    password: "",
    nom: "",
    prenom: "",
    admin: false,
    complement: { adresse: "", telephone: "", informations: "" },
  });

  const [panier, setPanier] = useState<Panier>({
    nomClient: "",
    listeLignes: [],
    prixTotalFacture: 0,
    idAnimal: 0
  });
  const [ligne, setLigne] = useState<Ligne>({
    id: 0,
    nom: "",
    quantite: 0,
    prix: 0,
    prixLigne: 0,
  });

  const navigate = useNavigate(); // pour rediriger la page

  const handleSubmit = (event) => {
    event.preventDefault();

    var oldPrixTot = 0;
    var newPrixTot = 0;
    var prixFinal;

    if (panier.listeLignes.length !== 0) {
      // evite la liste vide du premier click
      oldPrixTot = panier.prixTotalFacture;

      for (let i = 0; i < panier.listeLignes.length; i++) {
        let newLigne = panier.listeLignes[i];
        let lastLigne = panier.listeLignes[panier.listeLignes.length - 1]; // recupere le dernier element

        if (
          newLigne.id === lastLigne.id &&
          panier.listeLignes.indexOf(newLigne) !== panier.listeLignes.length - 1
        ) {
          // si l id article est egale pour 2 ligne et que ce n est pas la meme ligne

          console.log("OK");
          //console.log(panier.listeLignes);

          setLigne({
            ...ligne,
            quantite: ligne.quantite + 1,
            prixLigne: ligne.prix * ligne.quantite,
          }); // creation d une nouvelle ligne
        }

        newPrixTot += panier.listeLignes[i].prixLigne; // met a jour le prix
      }

      prixFinal = newPrixTot - oldPrixTot + animal.prix;
    } else {
      prixFinal = animal.prix;
    }

    setPanier({
      ...panier,
      listeLignes: [...panier.listeLignes, { ...ligne }],
      prixTotalFacture: panier.prixTotalFacture + prixFinal,
    });
  };

  function toPage() {
    navigate("/recappanier");
  }

  // const ligneDelete = (index) => {
  //   let tmp = panier.listeLignes.filter((v, i) => i !== index);
  //   setPanier({ ...panier, listeLignes: [...tmp] });
  // };

  const disableBtn = (e) => {
    console.log(e.target.id);
    e.target.setAttribute("disabled", true);
    e.target.style["background-color"] = "grey";
  };

  useEffect(() => {
    var itemA = sessionStorage.getItem("animal");
    //console.log(itemA);
    if (itemA) {
      setAnimal(JSON.parse(itemA));
      //console.log(JSON.parse(itemA));
    } else {
      setAnimal({
        id: 0,
        nom: "",
        race: "",
        espece: "",
        age: 0,
        poids: 0,
        sexe: "",
        localisation: "",
        urlImage: "",
        prix: 0,
        complement: { vaccin: false, sterilise: true, informations: "" },
        status: "",
      });
    }

    var itemC = sessionStorage.getItem("utilisateur");
    //console.log(itemC);
    if (itemC) {
      setClient(JSON.parse(itemC));
      //console.log(JSON.parse(itemC));
    } else {
      setClient({
        id: 0,
        login: "",
        password: "",
        nom: "",
        prenom: "",
        admin: false,
        complement: { adresse: "", telephone: "", informations: "" },
      });
    }

    sessionStorage.setItem("lastLigne", JSON.stringify(ligne));
    sessionStorage.setItem("panier", JSON.stringify(panier));
  }, [panier]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-principal">
        {articleList.length > 0 &&
          articleList.map((article, index) => (
            <div key={index} className="carte">
              <div className="shadow carte-principal">
                <img
                  src={`assets/${article.urlImage}`}
                  className="card-image-animal"
                  style={{ width: 250, height: 250 }}
                  alt={article.name}
                />
                <div className="card-container-text">
                  <h4 className="card-nom">{article.nom}</h4>
                  <div className="card-information">
                    <div className="card-information-prix">
                      <img
                        className="card-information-logo"
                        src="assets/prix.png"
                        alt="devise"
                      />
                      <p className="card-information-text card-information-text-prix">
                        {article.prix} €
                      </p>
                    </div>
                  </div>
                  <p className="card-text-description">{`${article.description.substring(
                    0,
                    MAX_LENGTH
                  )}`}</p>
                  <div className="card-button">
                    <ButtonComponent
                      lien={`/pagearticle`}
                      text="Ajouter"
                      //handleOnClick={(e) => setLigne({ ...ligne, id: Number(article.id), nom: article.nom, prix: Number(article.prix), quantite: 1 })}
                      handleOnClick={(e) => {
                        setLigne({
                          ...ligne,
                          id: Number(article.id),
                          nom: article.nom,
                          prix: Number(article.prix),
                          quantite: 1,
                          prixLigne: Number(article.prix),
                        });
                        setPanier({ ...panier, nomClient: client.nom, prixTotalFacture: (panier.prixTotalFacture + Number(article.prix))});
                        disableBtn(e)
                        //uniqueId(panier, article, index, e)
                        alert(`${article.nom} a été ajouté au panier`);
                      }}
                    ></ButtonComponent>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <br></br>
      <input
        type="submit"
        value="Passer la commande"
        className="button-default mb-3"
        onClick={() => {
          toPage();
        }}
      />
    </form>
  );
}

export default CardArticle;
