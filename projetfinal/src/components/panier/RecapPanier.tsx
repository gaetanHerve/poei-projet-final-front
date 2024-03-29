import { useState, useEffect } from 'react';
import { Panier } from '../../models/Panier';
import React from 'react';
import ICommande from "../../models/ICommande";
import "../../styles/RecapPanier.css";
import Personne from '../../models/Personne';
import { Animal } from '../../models/Animal';
import { useNavigate } from 'react-router-dom';

function RecapPanier() {
	const navigate = useNavigate();

	const getCurrentDate = () => {
		let d = new Date();
		let dateString = ('0' + d.getDate()).slice(-2) + '/'
             + ('0' + (d.getMonth()+1)).slice(-2) + '/'
             + d.getFullYear() + ' à '
			 + ('0' + (d.getHours())).slice(-2) + ':'
			 + ('0' + (d.getMinutes())).slice(-2) + ':'
			 + ('0' + (d.getSeconds())).slice(-2);
		return dateString;
	}

	const [animal, setAnimal] = useState<Animal>({  
		// Why not new Animal() ?
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
		complement: { vaccin: false,
			sterilise: true,
			informations: ""},
		status: "",

	});

	const [panier, setPanier] = useState<Panier>({nomClient:"", idAnimal: 0, listeLignes: [], prixTotalFacture: 0 });
	const [client, setClient] = useState<Personne>({
		// Why not new Person ?
		id: 0,
		login: "",
		password: "",
		nom: "",
		prenom: "",
		admin: false,
		complement: {    adresse: "",
			telephone: "",
			informations: ""},
	});

	// check if panier.prixTotalFacture is ok
	useEffect(() => {
		// check theoretical price
		let wantedPrice = 0;
		wantedPrice += animal.prix;
		panier.listeLignes.forEach(ligne => {
			wantedPrice += ligne.prix * ligne.quantite;
		});
		if (wantedPrice !== panier.prixTotalFacture) {
			setPanier({...panier, prixTotalFacture: wantedPrice});
		}
	}, [animal.prix, panier]);

	const [date, setDate] = useState("");
	const [commande, setCommande] = useState<ICommande>({
		id: 0,
		idClient: 0,
		infos: JSON.stringify(panier),
		jour: getCurrentDate(),
		prixTotal: 0,
		facture: false,
	});

	const handleDelete = (index, e) => {
		let tmp = panier.listeLignes.filter((v, i) => i !== index)
		var prixLigneSupp = panier.listeLignes[index].prixLigne
		setPanier({ ...panier, listeLignes: [...tmp], prixTotalFacture: panier.prixTotalFacture - prixLigneSupp})
	}

	useEffect(() => {
		var itemA = sessionStorage.getItem("animal");
		if (itemA) {
			setAnimal(JSON.parse(itemA));
		}
		else {
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
				complement: { vaccin: false,
					sterilise: true,
					informations: ""},
				status: "",
		
			});
		}

		var itemP = sessionStorage.getItem("panier");
		if (itemP) {
			setPanier(JSON.parse(itemP));
		}
		else {
			setPanier({nomClient:"", idAnimal: 0, listeLignes: [], prixTotalFacture: 0 });
		}

		var itemC = sessionStorage.getItem("utilisateur");
		if (itemC) {
			setClient(JSON.parse(itemC));
		}
		else {
			setClient({
				id: 0,
				login: "",
				password: "",
				nom: "",
				prenom: "",
				admin: false,
				complement: {    adresse: "",
					telephone: "",
					informations: ""},
			});
		}

		setDate(getCurrentDate());

	}, [])

	function handleIncreaseClick(index) {
		let oldPrixLigne // recupere la valeur de l'ancien prixLigne
		let newPrixLigne
		let tmp = panier.listeLignes.map((ligne, i) => {
			if (i === index) {
				oldPrixLigne = ligne.prixLigne;
				newPrixLigne = ligne.prix * (ligne.quantite + 1);
				return {
					...ligne,
					quantite: ligne.quantite + 1,
					prixLigne: newPrixLigne
				};
			} else {
				return ligne;
			}
		})
		setPanier({ ...panier, listeLignes: [...tmp], prixTotalFacture: panier.prixTotalFacture - oldPrixLigne + newPrixLigne }) // met a jour le prix total
		console.log(oldPrixLigne, newPrixLigne)
	}

	function handleDecreaseClick(index) {
		let oldPrixLigne
		let newPrixLigne
		let tmp = panier.listeLignes.map((ligne, i) => {
			if (i === index && (ligne.quantite - 1 >= 0)) { // empeche la quantite d etre negatif
				oldPrixLigne = ligne.prixLigne;
				newPrixLigne = ligne.prix * (ligne.quantite - 1);
				return {
					...ligne,
					quantite: ligne.quantite - 1,
					prixLigne: newPrixLigne
				};
			} else {
				return ligne;
			}
		})
		setPanier({ ...panier, listeLignes: [...tmp], prixTotalFacture: panier.prixTotalFacture - oldPrixLigne + newPrixLigne })
		//console.log(tmp)
	}

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(commande)
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setCommande({
			...commande,
			idClient: client.id,
			infos: JSON.stringify({...panier, idAnimal: animal.id}),
			jour: getCurrentDate(),
			prixTotal: panier.prixTotalFacture,
			facture: false,
		})

		requestOptions.body = JSON.stringify({
			...commande,
			idClient: client.id,
			infos: JSON.stringify({...panier, idAnimal: animal.id}),
			jour: getCurrentDate(),
			prixTotal: panier.prixTotalFacture,
			facture: false
		});

		fetch('http://localhost:8080/patoune-moi/commandes', requestOptions).then((response) => {
			if (response.ok) {
				alert("Votre commande a bien été validée. Vous allez être redirigé vers le récapitulatif de vos commandes");
				navigate('/compte');
			} else {
				alert("Un problème est survenu durant la validation de votre commande. Vous allez être redirigé vers la page d'accueil");
				navigate('/');
			}
		});
	}

	return (
		<section>
			<div className="container py-5">
				<form onSubmit={handleSubmit}>
					<div className="card">
						<div className="card-body">
							<div className="row d-flex justify-content-center pb-5">
								<div className="col-md-7 col-xl-5 mb-4 mb-md-0">
									<div className="py-4 d-flex flex-row">
										<h2><b>Votre Animal</b></h2>
									</div>

									<p>
										<h4>Nom : {animal.nom}</h4>
									</p>
									<p><h4>Prix : {animal.prix} €</h4></p>
									<hr />

									<div className="py-4 d-flex flex-row">
										<h2><b>Votre Panier</b></h2>
									</div>

									<div >
										<table className="table align-middle mb-0 bg-white">
											<thead className="bg-light">
												<tr>
													<th>Id</th>
													<th>Nom</th>
													<th>Quantite</th>
													<th>Prix</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{panier.listeLignes.length > 0 && panier.listeLignes.map((ligne, index) => (
													<tr key={index}>
														<td>
															<p className="text-muted mb-0">{ligne.id}</p>
														</td>
														<td>
															<p className="fw-normal mb-1">{ligne.nom} </p>
														</td>
														<td><div>
															<button type="button" className="btn btn-light" onClick={() => {
																handleDecreaseClick(index);
															}}>
																-
															</button>
															<input
																type="text"
																className="input-width"
																//className="text-center border-0 fw-normal mb-1"
																value={ligne.quantite}
															/>

															<button type="button" className="btn btn-light" onClick={() => {
																handleIncreaseClick(index);
															}}>
																+
															</button>
														</div>
														</td>
														<td>
															<div className="price-width">{ligne.prixLigne} €</div></td>
														<td><div className="text-center"><button type="button"
															className="btn btn-outline-secondary border-0"
															data-mdb-ripple-color="dark"
															onClick={e => handleDelete(index, e)}>Supprimer</button></div></td>
													</tr>
												))}
												<tr>
													<td></td>
													<td></td>
													<td><div className="price-width">
														<p className="text-right fw-bold">Total :</p></div>
													</td>
													<td><div className="price-width">
														<p className="fw-bold mb-1">{panier.prixTotalFacture} € </p></div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<div className="col-md-5 col-xl-4 offset-xl-1">
									<div className="py-4 d-flex flex-row">
										<h2><b>Vous</b></h2>
									</div>
									<p>
									<h4>Client : {client.nom}</h4>
									</p>
									<p><h4>Date : {date}</h4></p>
									<hr />
									<div className="pt-2">
									<div className="py-4 d-flex flex-row">
										<h2><b>Paiment</b></h2>
									</div>
										<p>
											Choisissez une option de paiment
										</p>
										<form className="pb-3">
											<div className="d-flex flex-row">
												<div className="d-flex align-items-center pe-2">
													<input className="form-check-input"
														type="radio"
														name="radioNoLabel"
														id="radioNoLabel1"
														// value="1"
														aria-label="..."
														// onClick={(e) => handlePaymentRadios(e)}
														// checked={true}
														/>
												</div>
												<div className="rounded border d-flex w-100 p-3 align-items-center">
													<p className="mb-0">
														<i className="fab fa-cc-mastercard fa-lg text-dark pe-2"></i>Mastercard
													</p>
													<div className="ms-auto">************1038</div>
												</div>
											</div>
											<div className="d-flex flex-row">
												<div className="d-flex align-items-center pe-2">
													<input className="form-check-input"
														type="radio"
														name="radioNoLabel"
														id="radioNoLabel2"
														// value="0"
														aria-label="..."
														// onClick={(e) => handlePaymentRadios(e)}
														// checked={false}
														/>
												</div>
												<div className="rounded border d-flex w-100 p-3 align-items-center">
													<p className="mb-0">
														<i className="fab fa-cc-mastercard fa-lg text-dark pe-2"></i>PayPal
													</p>
												</div>
											</div>
											<div className="d-flex flex-row">
												<div className="d-flex align-items-center pe-2">
													<input className="form-check-input"
														type="radio"
														name="radioNoLabel"
														id="radioNoLabel3"
														// value="0"
														aria-label="..."
														// onClick={(e) => handlePaymentRadios(e)}
														// checked={false}
														/>
												</div>
												<div className="rounded border d-flex w-100 p-3 align-items-center">
													<p className="mb-0">
														<i className="fab fa-cc-mastercard fa-lg text-dark pe-2"></i>3 ou 4 fois
													</p>
													<div className="ms-auto text-muted ">sans frais</div>
												</div>
											</div>
										</form>
										<br></br>
										<input type="submit"
											value="Commander"
											className="button-default mb-3"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</section >
	)
}

export default RecapPanier;
