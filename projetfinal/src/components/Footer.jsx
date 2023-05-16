import React from "react";
import ButtonComponent from "./ButtonComponent";
import FooterLink from "./FooterLink";
import "./Footer.css";
import "./Button.css";

function Footer() {
	return (
		<div className="footer-container">
			<div className="footer-text-container">
				<h3 className="title-footer">
					Venez nous
					<img
						src="assets/heart.png"
						style={{ width: 30 }}
						alt="logo amour"
					/>{" "}
					!
				</h3>

				<h5 className="subtitle-footer">Ici on cherche seulement de l'amour</h5>

				<p className="text-footer">
					Aidez nos fidèles compagnons{" "}
					<img src="assets/chat50.png" alt="logo chat" />{" "}
					<img src="assets/chien50.png" alt="logo chien" />à retrouver une
					famille aimante
				</p>
			</div>

			<div className="container-link">
				<div className="links">
					<FooterLink
						lien={"https://www.facebook.com/AdoptionChatsNantes/?locale=fr_FR"}
						img={<img src="assets/fb50.png" alt="logo Facebook" />}
						handleOnClick={() => {}}
					></FooterLink>

					<FooterLink
						lien={"https://www.instagram.com/henrythecoloradodog/"}
						img={<img src="assets/insta50.png" alt="logo Instagram" />}
						handleOnClick={() => {}}
					></FooterLink>

					<FooterLink
						lien={"https://twitter.com/chats_chiens?lang=fr"}
						img={<img src="assets/twi50.png" alt="logo Twitter" />}
						handleOnClick={() => {}}
					></FooterLink>
				</div>
				<div className="button-place">
					<ButtonComponent
						lien="/"
						text="Nous Contacter"
						handleOnClick={() => {}}
					></ButtonComponent>
				</div>
			</div>
		</div>
	);
}

export default Footer;
