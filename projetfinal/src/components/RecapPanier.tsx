import { useState, useEffect } from 'react';
import { Panier, Ligne } from './Panier';
import { Animal } from './Animal';
import React from 'react';
import { Personne } from './personne';
import { Commande } from "./Commande";
import "./RecapPanier.css";

function RecapPanier() {
    const [animal, setAnimal] = useState({});
    const [panier, setPanier] = useState<Panier>({ listeLignes: [], prixTotalFacture: 0 });
    const [client, setClient] = useState<Personne>({
        id: 0,
        nom: "",
        prenom: "",
    });
    const [date, setDate] = useState("");
    const [ligne, setLigne] = useState<Ligne>({ id: 0, nom: "", quantite: 0, prix: 0, prixLigne: 0 });

    const [commande, setCommande] = useState<Commande>({
        id: 0,
        id_client: 0,
        infos: JSON.stringify(panier),
        jour: "",
        prix_total: 0,
        facture: "",
    });

    const handleDelete = (index, e) => {
        let tmp = panier.listeLignes.filter((v, i) => i !== index)
        //console.log(tmp)
        setPanier({ ...panier, listeLignes: [...tmp] })
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commande)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        /* 		setPanier({
                    ...panier, listeLignes: [...panier.listeLignes, { ...ligne }],
                }) */

        setCommande({
            ...commande,
            id_client: client.id,
            infos: JSON.stringify(panier),
            jour: "",
            prix_total: panier.prixTotalFacture,
            facture: "",
        })

        fetch('http://localhost:8080/patoune-moi/commandes', requestOptions);

    }

    useEffect(() => {

        var itemA = sessionStorage.getItem("animal");
        //console.log(itemA);
        if (itemA) {
            setAnimal(JSON.parse(itemA));
            //console.log(JSON.parse(itemA));
        }
        else {
            setAnimal({});
        }

        var itemP = sessionStorage.getItem("panier");
        //console.log(itemP);
        if (itemP) {
            setPanier(JSON.parse(itemP));
            //console.log(JSON.parse(itemP));
        }
        else {
            setPanier({ listeLignes: [], prixTotalFacture: 0 });
        }

        var itemC = sessionStorage.getItem("client");
        //console.log(itemC);
        if (itemC) {
            setClient(JSON.parse(itemC));
            //console.log(JSON.parse(itemC));
        }
        else {
            setClient({
                id: 0,
                nom: "",
                prenom: "",
            });
        }

        var d = new Date();
        var actualDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        setDate(actualDate);


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

                                    METTRE INFOS ANIMAL

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
                                                        <td>{ligne.prixLigne} €</td>
                                                        <td><div className="text-center"><button type="button"
                                                            className="btn btn-outline-secondary border-0"
                                                            data-mdb-ripple-color="dark"
                                                            onClick={e => handleDelete(index, e)}>Supprimer</button></div></td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <p className="text-right fw-bold mb-1">Total :</p>
                                                    </td>
                                                    <td>
                                                        <p className="fw-bold mb-1">{panier.prixTotalFacture} € </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="col-md-5 col-xl-4 offset-xl-1">
                                    <div className="py-4 d-flex flex-row">
                                        <h2><b></b></h2>
                                    </div>
                                    <br></br>
                                    <div className="d-flex pt-2">
                                        <div>
                                            <p>
                                                <b>Informations <span className="text-success"></span></b>
                                            </p>
                                        </div>
                                    </div>
                                    <p>
                                        Client : {client.nom}
                                    </p>
                                    <p>Date : {date}</p>
                                    <hr />
                                    <div className="pt-2">
                                        <div className="d-flex pb-2">
                                            <div>
                                                <p>
                                                    <b>Paiment <span className="text-success"></span></b>
                                                </p>
                                            </div>
                                        </div>
                                        <p>
                                            Choisissez une option de paiment
                                        </p>
                                        <form className="pb-3">
                                            <div className="d-flex flex-row">
                                                <div className="d-flex align-items-center pe-2">
                                                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2"
                                                        value="" aria-label="..." />
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
                                                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2"
                                                        value="" aria-label="..." />
                                                </div>
                                                <div className="rounded border d-flex w-100 p-3 align-items-center">
                                                    <p className="mb-0">
                                                        <i className="fab fa-cc-mastercard fa-lg text-dark pe-2"></i>PayPal
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <div className="d-flex align-items-center pe-2">
                                                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2"
                                                        value="" aria-label="..." />
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
                                        <input type="submit" value="Commander" className="button-default mb-3" />
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
