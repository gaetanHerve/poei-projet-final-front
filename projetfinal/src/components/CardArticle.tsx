import React from "react";
import { useNavigate } from 'react-router-dom';
import ButtonComponent from "./ButtonComponent";
import "./Card.css";
import { useState, useEffect } from "react";
import { Panier, Ligne } from "./Panier";
import { Session } from "inspector";

function CardArticle({ articleList }) {
	const MAX_LENGTH = 70;

	const [animal, setAnimal] = useState({});
	const [personne, setPersonne] = useState({});

	const [panier, setPanier] = useState<Panier>({ listeLignes: [], prixTotalFacture: 0 });
	const [ligne, setLigne] = useState<Ligne>({ id: 0, nom: "", quantite: 0, prix: 0, prixLigne: 0 });

	const navigate = useNavigate(); // pour rediriger la page

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(`http://localhost:8080/patoune-moi/animaux/${1}`).then((res) => res.json()).then(data => {
			setAnimal(data);
			sessionStorage.setItem("animal", JSON.stringify(data));
		});

		fetch(`http://localhost:8080/patoune-moi/personnes/${2}`).then((res) => res.json()).then(data => {
			setPersonne(data);
			sessionStorage.setItem("client", JSON.stringify(data));
		});

		/* 		var ligneUpd = ({ ...ligne, nom: animal.nom, prix: animal.prix, prixLigne: animal.prix * ligne.quantite }) // update de la ligne avec les infos manquantes
				setPanier({
					...panier, listeLignes: [...panier.listeLignes, { ...ligneUpd }], prixTotalFacture: panier.prixTotalFacture + (ligneUpd.prixLigne)
				}); */


		setPanier({
			...panier, listeLignes: [...panier.listeLignes, { ...ligne }], prixTotalFacture: animal.prix
		});

		console.log("CLICK");

		console.log(ligne);

		console.log("PANIER");

		console.log(panier);

		for (let i = 0; (i < panier.listeLignes.length); i++) {

			let newLigne = panier.listeLignes[i];
			let lastLigne = panier.listeLignes[panier.listeLignes.length - 1]; // recupere le dernier element

			//console.log(panier.listeLignes.indexOf(newLigne), newLigne.id, lastLigne.id, panier.listeLignes.length)

			if (newLigne.id === lastLigne.id && panier.listeLignes.indexOf(newLigne) !== panier.listeLignes.length - 1) { // si l id article est egale pour 2 ligne et que ce n est pas la meme ligne
				//console.log("OK");

				panier.listeLignes[panier.listeLignes.indexOf(newLigne)].quantite += 1; // incremente la quantite

				var quantiteUpd = panier.listeLignes[panier.listeLignes.indexOf(newLigne)].quantite;

				panier.listeLignes[panier.listeLignes.indexOf(newLigne)].prixLigne = quantiteUpd * panier.listeLignes[panier.listeLignes.indexOf(newLigne)].prix; // incremente la quantite

				ligneDelete(panier.listeLignes.length - 1); // supprime la derniere ligne (le dernier article arrive)

			}

			panier.prixTotalFacture += panier.listeLignes[i].prixLigne; // met a jour le prix

		}

	}

	function toPage() {
		navigate('/recappanier');
	}

	const ligneDelete = (index) => {
		let tmp = panier.listeLignes.filter((v, i) => i !== index)
		setPanier({ ...panier, listeLignes: [...tmp] })
	}

	const disableBtn = (e) => {
		e.preventDefault();
    console.log(e.target.id);
    e.target.setAttribute("disabled", true);
    e.target.style["background-color"] = "grey";
  }

	useEffect(() => {

		sessionStorage.setItem("panier", JSON.stringify(panier));
	}, [panier])

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
								/>
								<div className="card-container-text">
									<h4 className="card-nom">{article.nom}</h4>
									<div className="card-information">
										<div className="card-information-prix">
											<img
												className="card-information-logo"
												src="assets/prix.png"
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
												setLigne({ ...ligne, id: Number(article.id), nom: article.nom, prix: Number(article.prix), quantite: 1, prixLigne: Number(article.prix) });
												//disableBtn(e)
												//uniqueId(panier, article, index, e)
											}}
										></ButtonComponent>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
			<br></br>
			<input type="submit" value="Passer la commande" className="button-default mb-3" onClick={() => {
				toPage();
			}} />
		</form>
	);
}

export default CardArticle;
