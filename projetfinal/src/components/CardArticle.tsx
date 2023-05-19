import React from "react";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import ButtonComponent from "./ButtonComponent";
import "./Card.css";
import { useState, useEffect } from "react";
import { Animal } from "./Animal";
import { Panier, Ligne } from "./Panier";
import { Personne } from "./personne";

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
			...panier, listeLignes: [...panier.listeLignes, { ...ligne }], prixTotalFacture: panier.prixTotalFacture + (ligne.prixLigne)
		});

	}

	function toPage() {
		navigate('/recappanier');
	}

	const ligneDelete = (index) => {
		let tmp = panier.listeLignes.filter((v, i) => i !== index)
		setPanier({ ...panier, listeLignes: [...tmp] })
	}

	function uniqueId(panier, article, index, e) {
		console.log("CLICK");
		for (let i = 0; (i < panier.listeLignes.length); i++) {
			console.log(article.id, panier.listeLignes[i].quantite);
			if (typeof panier.listeLignes[i].quantite !== 'undefined') {

				let idLigne = panier.listeLignes[i];
				var quantiteUpd;

				if (idLigne.id === article.id) {

					quantiteUpd = panier.listeLignes[i].quantite + 1;
					ligneDelete(i);

				}
			}

			else {

				quantiteUpd = 1;
			}

		}

		return setLigne({ ...ligne, id: Number(article.id), nom: article.nom, prix: Number(article.prix), quantite: quantiteUpd, prixLigne: Number(article.prix) * quantiteUpd });

	}

/* 	function isUndefined(panier) {
		console.log("CLICK");
		for (let i = 0; (i < panier.listeLignes.length); i++) {
			//console.log(article.id, panier.listeLignes[i].quantite);
			if (typeof panier.listeLignes[i].quantite === 'undefined') {
				console.log("OK");
				console.log(i, panier.listeLignes[i].quantite);
				ligneDelete(i);

			}

		}

	} */


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
										<div className="card-information-age">
											<p className="card-information-text">{article.prix} €</p>
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
											handleOnClick={(e) => uniqueId(panier, article, index, e)} // persiste pour corriger le premier click
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
