import React, { useEffect, useState } from "react";
import "./PageAccueil.css";
import "./DescriptionComponent.css";
import { useParams } from "react-router-dom";
import { Animal } from "./Animal";

function DescriptionComponent() {
	const { id } = useParams();
	// const [animal, setAnimal] = useState<Animal>();

	//     fetch(http://localhost:8080/site/rfcompagnon/${id})
	//       .then((res) => res.json())
	//       .then((data) => setAnimal(data));
	//   }, []);

	const animal = new Animal();
	animal.id = 1;
	animal.nom = "Felix";
	animal.race = "Berger Australien";
	animal.espece = "chien";
	animal.age = 3;
	animal.poids = 15;
	animal.sexe = "Femelle";
	animal.endroit = "Rennes";
	animal.urlImage = "chien2.jpg";
	animal.vaccin = "Oui";
	animal.sterilise = "Non";
	animal.prix = 150;
	animal.description =
		"Félix est un chat charmant et joueur à la recherche d'une maison pour la vie. Avec ses grands yeux verts et son pelage doux et soyeux, Félix est une véritable beauté. Ce félin élégant a environ deux ans et déborde d'énergie et de curiosité.";
	return (
		<div className="description-card-container">
			<div className="description-container">
				<h4 className="description-title">Je suis {animal.nom}</h4>
				<div className="description-texte">
					<div className="Container-unprice">
						<div className="description-logo">
							<img className="logo-css" src="assets/gender.png" alt="gender" />
							<img
								className="logo-css"
								src="assets/calendar.png"
								alt="calendrier"
							/>
							<img className="logo-css" src="assets/poids.png" alt="poids" />
							<img
								className="logo-css"
								src="assets/endroit48.png"
								alt="endroit"
							/>
						</div>
						<div className="decrip-texte">
							<div className="texte-css">{animal.sexe}</div>
							<div className="texte-css">{animal.age} an(s)</div>
							<div className="texte-css">{animal.poids} kg</div>
							<div className="texte-css">{animal.endroit}</div>
						</div>
					</div>
					<div className="decription-prix">
						<div>
							<img className="logo-css-price" src="assets/prix.png" alt="€" />
						</div>
						<div className="texte-css"> {animal.prix}</div>
					</div>
				</div>
			</div>
			<div className="description-autre">
				<div>Je suis un {animal.espece}</div>
				<div>De la race des {animal.race}</div>
				<div>Mes Vaccins sont à jours {animal.vaccin}</div>
				<div>Je peux engendrer {animal.sterilise}</div>
			</div>
		</div>
	);
}

export default DescriptionComponent;
