import React from "react";
import "./PageAccueil.css";
import "./DescriptionComponent.css";
import "./Button.css";
import ButtonComponent from "./ButtonComponent";
import animal from "./AnimalData";

function DescriptionComponent() {
	return (
		<div className="description-card-container">
			<div className="description-container">
				<div className="frame-container">
					<div className="frame-general-css-title">
						<p className="description-title">{animal.nom}</p>
					</div>
				</div>
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
					<div className="button-description-css">
						<ButtonComponent
							handleOnClick={undefined}
							text={"Ajouter au panier"}
							lien={undefined}
						></ButtonComponent>
					</div>
				</div>
			</div>
			<div className="frame-container">
				<div className="frame-general-css">
					<div>Je suis un {animal.espece}</div>
				</div>
				<div className="frame-general-css">
					<div>De la race des {animal.race}</div>
				</div>
				<div className="frame-general-css">
					<div>Mes Vaccins sont à jours {animal.vaccin}</div>
				</div>
				<div className="frame-general-css">
					<div>Je suis stérilisé {animal.sterilise}</div>
				</div>
			</div>
		</div>
	);
}

export default DescriptionComponent;
